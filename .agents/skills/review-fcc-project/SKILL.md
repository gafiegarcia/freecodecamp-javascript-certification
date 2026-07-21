---
name: review-fcc-project
description: Review an already-submitted freeCodeCamp JavaScript project as a beginner learning artifact, beyond merely checking whether it passes fCC tests. Use when the user asks for a review, critique, best-practice assessment, curriculum-appropriate improvement, more efficient or idiomatic solution, beginner pitfalls, or feedback on what they did well in a completed fCC project.
---

# Review a freeCodeCamp Project

Review the submission to deepen the user's understanding, not merely to produce a better solution.

## Follow the review workflow

1. Inspect the target code and the project's instructions or user stories. The instructions is usually saved in the same folder as the project's code as `user-story.md` or `instructions.md`; if it's nowhere to be found, just search for it in the curriculum available in freeCodeCamp's repo. Ask only when missing instructions/requirements prevent a trustworthy review.
2. Treat passing fCC tests as a useful baseline, not proof that the code is readable, efficient, idiomatic, or robust.
3. Locate the current project in `<repo-root>/fcc-js-curriculum.md` and determine which JavaScript concepts have been taught up to that point. Read enough surrounding curriculum context to establish that boundary.
4. Evaluate the submission for:
   - correctness and adherence to the project requirements;
   - readability, naming, organization, and maintainability;
   - unnecessary work or complexity;
   - idiomatic JavaScript that uses concepts already taught;
   - beginner pitfalls or habits worth correcting early;
   - sound choices and habits worth reinforcing; and
   - edge cases the fCC tests may not communicate clearly.
5. Distinguish actual problems from optional style preferences. Prioritize findings by their effect on correctness, comprehension, and long-term habits.
6. Keep the main recommendations within the established curriculum boundary. If a useful approach relies on concepts taught later, mention it only in a clearly labeled "Look ahead" section and do not present it as something the user should already have known.

## Teach at the user's level

- Assume the user is new to programming and currently completing the freeCodeCamp JavaScript curriculum after finishing Responsive Web Design.
- Put correctness first, then explain the reasoning in plain language. Define unfamiliar terms and use a simple analogy when it materially helps the idea click.
- Prefer specific explanations of *why* an approach is better over unexplained prescriptions.
- Keep the tone encouraging and enthusiastic without hiding problems.
- Because this is a review of an already-submitted project, show concise rewritten snippets or a complete alternative when they make the lesson clearer. Compare them with the user's approach so the user can understand the change rather than merely copy it.
- Do not edit the submitted project unless the user explicitly asks for changes.

## Structure the response

Lead with the overall assessment, then answer these questions:

1. Is there a more efficient or idiomatic solution using only concepts taught by this point in the curriculum?
2. Are there beginner pitfalls or bad habits that should be fixed before they stick?
3. What did the user do well and should keep doing?

Include file and line references for concrete findings when possible. End with an optional "Look ahead" section only when an advanced technique would be genuinely useful. If a category has no meaningful findings, say so directly rather than inventing criticism.
