# Content Production and Distribution

## Source-of-truth model

The repository contains the canonical lesson content. Produce platform-specific assets from it:

- Video script and shot list
- Captions/transcript
- Slides or diagrams
- Downloadable code archive
- Exercises and solutions
- Platform description and metadata

These assets are optional delivery layers. Do not place essential technical content exclusively in a platform upload.

## Recording standard

Each lesson should include:

1. A short production failure demonstration.
2. A visual mental model.
3. A live or replayable implementation.
4. One hardening change.
5. Test output proving the result.
6. A recap and next-step connection.

Keep the main lesson within 45 minutes. Put deeper theory, alternate runtimes, and extended challenges in written supplements.

## Distribution requirements

The course must work when delivered through YouTube, Udemy, a private LMS, a company portal, or a downloadable repository. Avoid assumptions about:

- URL permanence
- Playlist or section ordering
- Platform-specific quiz systems
- Platform-specific authentication
- Paid features
- Comments or community posts

Use stable module numbers and repository paths as identifiers.

## Release checklist

- [ ] Repository instructions work without the video.
- [ ] Code is licensed and redistributable as intended.
- [ ] No secrets, private URLs, or account-specific steps are committed.
- [ ] Local setup and hardware requirements are stated.
- [ ] Captions/transcript are available for recorded lessons.
- [ ] Platform description matches the repository scope.
- [ ] Downloadable code matches the tagged repository version.
- [ ] All module tests pass.
- [ ] Optional cloud instructions are clearly separated from the vendor-neutral core.
