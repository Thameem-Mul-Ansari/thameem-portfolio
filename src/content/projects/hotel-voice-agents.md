---
title: AI voice agents for hotel reservations
summary: Phone agents that book, reschedule and cancel stays for a UAE hotel, and hand off to a human when needed.
category: Voice AI
client: Hotel in the UAE
year: '2026'
role: End-to-end developer
accent: orange
order: 2
metrics:
  - value: '~70%'
    label: of routine inbound calls automated
  - value: '90%+'
    label: answer accuracy from the knowledge base
stack: [Twilio, Azure OpenAI GPT Realtime, RAG, Python]
cover: ../../assets/projects/hotel-voice-agents/cover.png
coverAlt: Voice agent call flow for hotel reservations
gallery:
  - src: ../../assets/projects/hotel-voice-agents/01-call-flow.png
    alt: Call flow from Twilio to the realtime voice agent
    caption: Calls stream from Twilio into Azure GPT Realtime.
  - src: ../../assets/projects/hotel-voice-agents/02-dashboard.png
    alt: Dashboard of call outcomes
    caption: Every call is logged with its outcome.
  - src: ../../assets/projects/hotel-voice-agents/03-mobile.png
    alt: Guest follow-up messages on a phone
    caption: Guests get a confirmation after the call.
---

## The problem

The hotel's front desk spent most of its phone time on routine requests: new bookings, date changes and cancellations. Guests waited on hold during busy hours.

## What I built

Production telephony agents on **Twilio** and **Azure OpenAI GPT Realtime** that hold natural conversations over the phone.

- Book, reschedule and cancel reservations
- Suggest upgrades and add-ons during the call
- Detect cancellation intent and transfer to a human agent
- Answer hotel questions from a RAG knowledge base built by scraping the website and ingesting the hotel's documents

## Results

The agents now handle about 70% of routine inbound calls, and the knowledge base answers with over 90% accuracy.
