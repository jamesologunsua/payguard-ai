// interswitch.service.js

// src/modules/interswitch/interswitch.service.js

import axios from "axios";

/**
 * Get a Bearer token from Interswitch sandbox
 */
export const getInterswitchToken = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.post(
        "https://sandbox.interswitchng.com/token",
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
          auth: {
            username: process.env.INTERSWITCH_CLIENT_ID,
            password: process.env.INTERSWITCH_CLIENT_SECRET
          },
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 5000 // 5 seconds timeout
        }
      );
      return res.data.access_token;
    } catch (err) {
      console.warn(`Interswitch token attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) return null;
      await new Promise(r => setTimeout(r, 1000)); // wait 1s before retry
    }
  }
};

/**
 * Verify a bank account using Interswitch sandbox API
 * @param {string} accountNumber - 10-digit account number
 * @param {string} bankCode - Bank code (e.g., 058 for GTBank)
 */
export const verifyAccount = async (accountNumber, bankCode) => {
  try {
    const token = await getInterswitchToken();
    if (!token) {
      console.warn("Could not get token, skipping Interswitch verification");
      return { isValid: false, accountName: null };
    }

    const res = await axios.get(
      "https://sandbox.interswitchng.com/api/v1/accounts/resolve",
      {
        params: { accountNumber, bankCode },
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Defensive handling of the response
    const accountName = res?.data?.data?.accountName || null;

    return {
      isValid: !!accountName,
      accountName
    };
  } catch (err) {
    console.error("Interswitch verification error:", err.response?.data || err.message);
    return { isValid: false, accountName: null };
  }
};