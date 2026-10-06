---
title: Sensei, an AI virtual teaching assistant
summary: An avatar tutor that builds a syllabus from your documents, answers raised hands live and proctors with vision AI.
category: Conversational AI
client: Education product
year: '2025'
role: Developer
accent: blue
order: 5
metrics:
  - value: 'Live'
    label: raise-hand Q&A with an AI avatar
stack: [Azure Avatar Services, FastAPI, React, TypeScript, Supabase]
cover: ../../assets/projects/sensei-teaching-assistant/cover.png
coverAlt: Sensei classroom with an AI avatar tutor
gallery:
  - src: ../../assets/projects/sensei-teaching-assistant/01-classroom.png
    alt: Avatar lecture view
    caption: The avatar teaches from the uploaded material.
  - src: ../../assets/projects/sensei-teaching-assistant/02-syllabus.png
    alt: Auto-generated syllabus
    caption: Upload documents and get a syllabus.
  - src: ../../assets/projects/sensei-teaching-assistant/03-mobile.png
    alt: Raise-hand questions on a phone
    caption: Students raise a hand and ask questions live.
---

## What I built

An avatar-based tutor on **Azure Avatar Services** with a **FastAPI** backend and a **React/TypeScript** front end.

- Generates a syllabus automatically from uploaded documents, stored in a **Supabase** vector database
- Live raise-hand Q&A, so students can interrupt and ask questions
- Vision-language-model proctoring during assessments
