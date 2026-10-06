# Agpeya Gate

Open the app: https://lordofblackwood.github.io/agpeya-gate/

This repository hosts the compiled PWA and all browser app logic on GitHub Pages. No sign-in is required. Prayer texts, schedule, reading progress, and word matching stay in browser storage on each device. Export a backup in Settings before clearing browser data or moving devices.

Optional push reminders use one small Cloudflare service on its Free plan because GitHub Pages cannot run a scheduled push sender. Only notification subscription and reminder timing/suppression metadata are sent; prayer texts, audio, transcripts, and detailed progress are not uploaded.

After adding the app to the iPhone Home Screen, enable notifications in Settings and send a test. Push reminders need internet. Cached prayer texts and local progress work offline; browser speech recognition may still need its provider's connection.

If you used the earlier private Site, download a backup there and restore it here. The GitHub app does not connect to or require that Site. Enable notifications again after migrating, since the notification service has changed.

No personal prayer data, private server credentials, or private push keys are published in this repository.
