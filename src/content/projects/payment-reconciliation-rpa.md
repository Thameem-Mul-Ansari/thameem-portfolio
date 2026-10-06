---
title: Payment-gateway reconciliation bot
summary: RPA that matches PhonePe, Paytm and Pine Labs settlements against Odoo for a pan-India retailer.
category: RPA
client: Pan-India retailer
year: '2025'
role: Developer (internship)
accent: orange
order: 6
metrics:
  - value: '3'
    label: payment gateways reconciled automatically
stack: [Power Automate Desktop, Excel Macros, Cashfree API, Shopify API, Odoo]
cover: ../../assets/projects/payment-reconciliation-rpa/cover.png
coverAlt: Reconciliation bot workflow
gallery:
  - src: ../../assets/projects/payment-reconciliation-rpa/01-flow.png
    alt: Power Automate Desktop reconciliation flow
    caption: The Power Automate Desktop flow.
  - src: ../../assets/projects/payment-reconciliation-rpa/02-report.png
    alt: Settlement reconciliation report
    caption: Matched and unmatched settlements in one report.
---

## The problem

The finance team matched payment-gateway settlements against Odoo by hand every day, and regularised ICICI Bank export bills manually.

## What I built

Bots in **Power Automate Desktop** with **Excel macros** and the **Cashfree** and **Shopify** APIs.

- Reconcile PhonePe, Paytm and Pine Labs settlements against Odoo
- Regularise ICICI Bank export bills
- Produce a report of matched and unmatched transactions
