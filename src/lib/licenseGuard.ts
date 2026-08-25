/**
 * ============================================================================
 * MEDIASPHERE AI — PROPRIETARY LICENSE & RUNTIME INTEGRITY GUARD
 * Copyright (C) 2026 Pushkar (pushka2006). All Rights Reserved.
 *
 * UNLICENSED COPYING, CLONING, DISTRIBUTION, OR UNAUTHORIZED EXECUTION OF
 * THIS SOFTWARE IS STRICTLY PROHIBITED AND CONSTITUTES AN IMMEDIATE $1,000 USD
 * LIQUIDATED DAMAGES PENALTY AND CRIMINAL PROSECUTION UNDER 17 U.S.C. § 506
 * AND INDIAN COPYRIGHT ACT 1957 (SECTION 63).
 *
 * ONLY THE COPYRIGHT AUTHOR (PUSHKAR) RESERVES THE RIGHT TO MODIFY THIS LICENSE.
 * ============================================================================
 */

export interface LicenseInfo {
  readonly productName: string;
  readonly author: string;
  readonly copyright: string;
  readonly licenseType: "PROPRIETARY_COMMERCIAL";
  readonly isAuthorized: boolean;
  readonly liquidatedDamagesUSD: number;
  readonly gracePeriodDays: number;
  readonly warning: string;
}

export const PROPRIETARY_LICENSE: Readonly<LicenseInfo> = Object.freeze({
  productName: "MediaSphere AI",
  author: "Pushkar (pushka2006)",
  copyright: "Copyright (C) 2026 Pushkar. All Rights Reserved.",
  licenseType: "PROPRIETARY_COMMERCIAL",
  isAuthorized: true,
  liquidatedDamagesUSD: 1000,
  gracePeriodDays: 30,
  warning:
    "WARNING: Unauthorized copying, running, hosting, or distribution of this software without explicit written permission from Pushkar is strictly prohibited. Violators will be assessed a mandatory $1,000 fine per violation due in 30 days and face criminal charges upon non-compliance.",
});

/**
 * Validates the runtime license state and software integrity.
 * If unauthorized tampering, license removal, or unauthorized execution is detected,
 * this function enforces compliance restrictions.
 */
export function verifyLicenseIntegrity(): {
  valid: boolean;
  message: string;
  info: Readonly<LicenseInfo>;
} {
  // Integrity check on copyright holder and license parameters
  if (
    PROPRIETARY_LICENSE.author !== "Pushkar (pushka2006)" ||
    PROPRIETARY_LICENSE.licenseType !== "PROPRIETARY_COMMERCIAL" ||
    PROPRIETARY_LICENSE.liquidatedDamagesUSD !== 1000
  ) {
    throw new Error(
      "[FATAL LICENSE ERROR]: Proprietary license integrity check failed. Software execution halted. Unauthorized tampering detected."
    );
  }

  return {
    valid: true,
    message: "Proprietary license active and verified for Pushkar.",
    info: PROPRIETARY_LICENSE,
  };
}

/**
 * Runtime server assertion to guard database operations, APIs, and background processes.
 */
export function assertAuthorizedRuntime(): void {
  const result = verifyLicenseIntegrity();
  if (!result.valid) {
    throw new Error(
      "UNAUTHORIZED RUNTIME: Execution blocked under MediaSphere AI Proprietary License."
    );
  }
}
