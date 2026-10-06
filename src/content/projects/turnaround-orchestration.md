---
title: Multi-agent turnaround orchestration platform
summary: Six specialised AI agents that plan, monitor and de-risk an oil & gas turnaround program.
category: Multi-agent systems
client: Oil & gas enterprise
year: '2026'
role: Architect and lead developer
accent: blue
order: 1
metrics:
  - value: '~40%'
    label: shorter turnaround planning cycle
  - value: '2–3 days'
    label: earlier warning on critical issues
stack: [LangGraph, Azure OpenAI GPT-4o, RAG, Flask, React, TypeScript, SQL Server, SAP]
cover: ../../assets/projects/turnaround-orchestration/cover.png
coverAlt: Turnaround command centre dashboard
gallery:
  - src: ../../assets/projects/turnaround-orchestration/01-dashboard.png
    alt: Predictive alert strip on the turnaround dashboard
    caption: Predictive alerts flag critical issues days ahead.
  - src: ../../assets/projects/turnaround-orchestration/02-agents.png
    alt: LangGraph graph connecting six specialised agents
    caption: Six agents coordinated through LangGraph.
  - src: ../../assets/projects/turnaround-orchestration/03-assistant.png
    alt: Generative-UI assistant handling approvals
    caption: The assistant answers queries, routes approvals and drafts emails.
---

## The problem

Turnaround programs in oil & gas involve thousands of interdependent tasks across risk, materials, vendors, procurement and workforce. Planners were stitching this together by hand from SAP and spreadsheets, and problems surfaced late.

## What I built

A six-agent platform on LangGraph and Azure OpenAI GPT-4o, with one specialised agent each for **risk, materials, vendor, procurement, workforce scheduling and work monitoring**. The agents read live data from Microsoft SQL Server and SAP.

- A predictive alert strip that flags critical issues before they hit the schedule
- A what-if simulator for testing schedule and resource changes
- A generative-UI assistant that answers questions, handles approvals and sends emails
- Approval workflows so humans stay in control of every decision

## Results

Planning cycle time dropped by about 40%, and critical issues are now flagged 2–3 days earlier than before.
