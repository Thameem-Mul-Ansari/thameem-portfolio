---
title: Customer-support call audio analytics
summary: Every support call transcribed, scored and analysed automatically, replacing manual call audits.
category: Speech analytics
client: Retail customer support team
year: '2025'
role: Developer
accent: blue
order: 3
metrics:
  - value: '100%'
    label: of manual call auditing replaced
stack: [Whisper large-v3, Azure GPT-4, ffmpeg, Flask, React, TypeScript, Azure VM]
cover: ../../assets/projects/call-audio-analytics/cover.png
coverAlt: Call quality analytics dashboard
gallery:
  - src: ../../assets/projects/call-audio-analytics/01-overview.png
    alt: Agent performance scores
    caption: Agent scores for coaching.
  - src: ../../assets/projects/call-audio-analytics/02-insights.png
    alt: Top complaints and peak call hours
    caption: Top complaints, peak hours and competitor mentions.
---

## The problem

Supervisors listened to calls by hand to check quality. They could only sample a small share of calls, so most problems went unnoticed.

## What I built

A pipeline that receives call recordings by webhook from the **Kaleyra** telephony provider, transcribes them with **Whisper large-v3**, and analyses tone and content with **Azure GPT-4**.

- Scores and segments every call
- Surfaces top complaints, peak hours and competitor mentions
- Tracks agent performance for coaching
- Manager and agent dashboards in React and TypeScript

## Results

Every call is now audited automatically, replacing 100% of the manual auditing work.
