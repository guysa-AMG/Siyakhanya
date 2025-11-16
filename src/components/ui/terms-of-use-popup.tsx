"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function TermsOfUsePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("termsAccepted");
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Terms of Use</AlertDialogTitle>
          <AlertDialogDescription>
            Terms and Conditions of Service

Effective Date: November 1, 2025

Please read these Terms and Conditions ("Terms") carefully before using the solar-Neighbour application ("Service") operated by solar-neighbour ("us", "we", or "our").

By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.

1. Acceptance of Terms

Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.

2. Changes to Terms

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.

3. User Accounts

When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.

4. Data Usage, Privacy, and Commercialization

4.1. Data Collection

We collect various types of information for purposes of providing and improving our Service, including but not limited to usage data, device data, location data, and information you directly provide. This collection is governed by our Privacy Policy (a separate document), which is incorporated by reference into these Terms.

4.2. Aggregated Data

We may process and analyze User Data and combine it with data from other users to create aggregated, anonymized, and statistical data. This aggregated data does not directly identify you and may be used by us for various business purposes.

4.3. Data Commercialization Rights (Sale of Data)

YOU ACKNOWLEDGE AND EXPRESSLY AGREE THAT WE RESERVE THE UNCONDITIONAL RIGHT, at our sole discretion, to commercialize, sell, license, or otherwise transfer the anonymized, aggregated, or individualized User Data collected through the Service to third parties, including but not limited to advertisers, data brokers, research organizations, and other commercial entities.

We may execute this right without seeking further direct consent or notification from you beyond the acceptance of these Terms. Your continued use of the Service constitutes your explicit and binding acceptance of this Data Commercialization Right.

5. Intellectual Property

The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of solar-neighbour and its licensors. The Service is protected by copyright, trademark, and other laws of both the Republic of South Africa and foreign countries.

6. Termination

We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.

7. Indemnification

You agree to defend, indemnify, and hold harmless solar-neighbour and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, including but not limited to attorney's fees, resulting from or arising out of a) your use and access of the Service, or b) a breach of these Terms.

8. Governing Law

These Terms shall be governed and construed in accordance with the laws of Republic of South Africa, without regard to its conflict of law provisions.

9. Contact Us

If you have any questions about these Terms, please contact us:

By email: admin@support.com

By visiting our website

End of Terms and Conditions
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAccept}>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
