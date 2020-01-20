# ExtraBirthdays - WIP

Currently supported calendars:
- Julian
- Hebrew

## Future?

### First wave (before public launch)

- Islamic (Hijri)
- Persian
- Mayan
- Indian Civil Calendar
- French Republican Calendar

### Second wave (will require new library and Lambda)
- Kurdish
- Afghani
- Bahai
- Old Hindu
- Achelis'
- Coptic
- Ethiopian
- Jalali
- Bahá'í 
- Revised Bengali
- Nanakshahi
- 〝Kyūreki〟

Based on the open-source convertor on https://www.fourmilab.ch/documents/calendar/

## Project setup
```
npm install
npm run serve
npm run build
npm run deploy
```

## Acknowledgements

I don't care at all about the internal workings of calendars, so I've repackaged the hard work of people who do!

(I should probably learn basic math one of these days) 

First-wave calendars are the ones implemented in:
* https://www.fourmilab.ch/documents/calendar/

Other calendars will use this Ruby gem:
* https://rubygems.org/gems/ruby-calendrical/versions/2.0.1

Which I'll pop in a dinky little Lambda function as soon as I've got the others squared away.