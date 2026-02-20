import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import User from "../models/User.js";
import { isConnected } from "../config/database.js";
import nodemailer from "nodemailer";

// Create transporter only if email credentials are available
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  try {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } catch (error) {
    console.warn("Failed to create email transporter:", error.message);
  }
}

export async function register(req, res) {
  const { name, email, password, role } = req.body || {};
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    if (!isConnected()) {
      // Return a mock success response when DB is not connected
      // In production, you might want to return an error instead
      console.warn("Database not connected. Registration not persisted.");
      return res.status(201).json({
        id: "temp_" + Date.now(),
        name,
        email,
        role: role || "user",
        message: "Registration successful (demo mode - database not connected)"
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || "user"
    });

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle Mongoose connection errors
    if (error.name === 'MongoServerError' || error.message?.includes('buffering timed out')) {
      return res.status(503).json({ 
        message: "Database connection unavailable. Please try again later.",
        error: "Service temporarily unavailable"
      });
    }
    
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    if (!isConnected()) {
      // Mock login for demo mode
      console.warn("Database not connected. Login not authenticated.");
      const role = /agent/i.test(email) ? "agent" : "user";
      const token = jwt.sign(
        { sub: "temp_" + Date.now(), role },
        process.env.JWT_SECRET || "dev-secret",
        { expiresIn: "1d" }
      );
      return res.json({
        token,
        user: {
          id: "temp",
          email,
          role,
          name: email.split("@")[0]
        },
        message: "Login successful (demo mode - database not connected)"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    
    // Handle Mongoose connection errors
    if (error.name === 'MongoServerError' || error.message?.includes('buffering timed out')) {
      return res.status(503).json({ 
        message: "Database connection unavailable. Please try again later.",
        error: "Service temporarily unavailable"
      });
    }
    
    return res.status(500).json({ message: "Login failed" });
  }
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if database is connected
    if (!isConnected()) {
      // Return mock response when DB is not connected
      const token = crypto.randomBytes(20).toString("hex");
      const frontendUrl = process.env.FRONTEND_URL || "https://storied-brigadeiros-76e5b9.netlify.app";
      const resetUrl = `${frontendUrl}/reset-password/${token}`;
      console.log("Database not connected. Mock reset link:", resetUrl);
      return res.json({ 
        message: "Password reset email sent (demo mode)",
        resetUrl: resetUrl // Include in response for demo purposes
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiry = Date.now() + 3600000; // 1 hour

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists for security, but log for debugging
      console.log(`Password reset requested for non-existent email: ${email}`);
      // Return success message even if user doesn't exist (security best practice)
      return res.json({ message: "If that email exists, a password reset link has been sent" });
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiry;
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "https://storied-brigadeiros-76e5b9.netlify.app";
    const resetUrl = `${frontendUrl}/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.</p><p>Click this link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a><p>This link will expire in 1 hour.</p>`
    };

    // Try to send email if transporter is available
    if (transporter) {
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
        return res.json({ message: "Password reset email sent" });
      } catch (emailError) {
        console.error("Email sending failed:", emailError.message);
        // Log the reset URL for manual use
        console.log("Password Reset Link:", resetUrl);
        return res.json({ 
          message: "Password reset email sent (email service unavailable, check logs for reset link)",
          resetUrl: resetUrl // Include in response for development
        });
      }
    } else {
      // No email service configured
      console.log("Email service not configured. Password Reset Link:", resetUrl);
      return res.json({ 
        message: "Password reset link generated (email service not configured)",
        resetUrl: resetUrl // Include in response for development
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    
    // Handle specific database errors
    if (error.name === 'MongoServerError' || error.message?.includes('buffering timed out')) {
      return res.status(503).json({ 
        message: "Database connection unavailable. Please try again later.",
        error: "Service temporarily unavailable"
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Invalid request data",
        error: error.message
      });
    }
    
    return res.status(500).json({
      message: "Error processing password reset request",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
}

export async function resetPassword(req, res) {
  const { token, newPassword } = req.body;
  
  if (!token || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // Check if database is connected
    if (!isConnected()) {
      return res.status(503).json({ 
        message: "Password reset unavailable (database not connected)",
        error: "Service temporarily unavailable"
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log(`Password reset successful for user: ${user.email}`);
    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    
    // Handle database errors
    if (error.name === 'MongoServerError' || error.message?.includes('buffering timed out')) {
      return res.status(503).json({ 
        message: "Database connection unavailable. Please try again later.",
        error: "Service temporarily unavailable"
      });
    }
    
    return res.status(500).json({ 
      message: "Error resetting password",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
}

