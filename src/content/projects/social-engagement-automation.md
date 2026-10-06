---
title: Social media engagement automation
summary: A multi-agent n8n system that replies to Instagram and Facebook DMs, comments, story replies and Google Reviews.
category: Workflow automation
client: Multi-branch retailer
year: '2025'
role: Developer
accent: orange
order: 4
metrics:
  - value: '4'
    label: channels handled automatically
stack: [n8n, Meta Graph API, VLMs, Shopify APIs]
cover: ../../assets/projects/social-engagement-automation/cover.png
coverAlt: n8n multi-agent workflow for social media replies
gallery:
  - src: ../../assets/projects/social-engagement-automation/01-n8n-flow.png
    alt: n8n workflow routing DMs and comments
    caption: One n8n workflow routes every message to the right agent.
  - src: ../../assets/projects/social-engagement-automation/02-replies.png
    alt: Automated replies on Instagram
    caption: Replies stay catalogue-aware through Shopify lookups.
---

## The problem

A retailer with multiple stores received a steady stream of DMs, comments, story replies and Google Reviews. Replies were slow and inconsistent across branches.

## What I built

A multi-agent system in **n8n** connected to the **Meta Graph API** and Google Reviews.

- Auto-responds to DMs, comments, story replies and reviews across stores
- Uses vision-language models to read reels and detect the products shown
- Looks up products in **Shopify** so replies mention real items, prices and availability

## Results

Customers get fast, accurate replies on every channel, and the team only steps in when a message needs a person.
