# BareBits Agent Guidelines

## Project Overview
BareBits is a Bitcoin Lightning Network payment processing service targeting businesses in regulated industries (adult entertainment, cannabis, firearms, etc.) who face discrimination and high fees from traditional payment processors.

## Brand Identity
- **Colors**: Gold (#FFB000), Black (#000000), White (#FFFFFF)
- **Fonts**: Acumin Pro Wide (local files), Helvetica Now fallback
- **Tone**: Direct, no-nonsense, anti-establishment, professional
- **Target**: Business owners frustrated with traditional payment processing

## Current Site Structure
1. **Hero**: "Stop Getting Screwed" + "Banks discriminate, we don't"
2. **Why/How/What**: Pain points → Solution → Benefits (with scroll animations)
3. **Why Bitcoin**: Lightning Network benefits
4. **How It Works**: 3-step process
5. **Calculator**: Savings calculator with gold styling
6. **Footer**: Services, support, company links

## Key Features
- **Calculator**: Pre-populated with $50k revenue, 5% fee
- **Fee Comparison**: Dropdown with industry rates (2.9%-15%)
- **Mobile Responsive**: All sections optimized for mobile
- **Scroll Animations**: Smooth transitions between sections
- **Local Fonts**: Acumin Pro Wide (regular and bold)

## Development Workflow
- **Branch**: `development` (main working branch)
- **Deploy**: `deploy` (triggers live site updates)
- **Process**: Work on `development` → merge to `deploy` → push to GitHub

## Technical Stack
- **HTML5**: Semantic structure
- **CSS3**: Custom properties, flexbox, grid
- **JavaScript**: Vanilla JS for interactions
- **Fonts**: Local WOFF/WOFF2 files
- **Images**: SVG logos, PNG assets

## Content Guidelines
- **Headlines**: Bold, direct, benefit-focused
- **Body Text**: Clear, concise, business-focused
- **CTAs**: Action-oriented ("Start Saving Today", "Learn More")
- **Pain Points**: Specific, relatable, industry-focused
- **Benefits**: Quantifiable, immediate, tangible

## Common Tasks
- **Calculator Updates**: Modify fee rates, add industries
- **Content Updates**: Update copy, add sections
- **Styling Changes**: Colors, fonts, layouts
- **Mobile Optimization**: Responsive design improvements
- **Performance**: Image optimization, code minification

## File Structure
```
/
├── index.html (main page)
├── assets/
│   ├── css/style.css (all styles)
│   ├── js/script.js (all interactions)
│   ├── images/ (logos, assets)
│   └── fonts/ (local font files)
└── README.md
```

## Deployment
- **Live Site**: Automatically updates when `deploy` branch is pushed
- **Testing**: Test on `development` branch first
- **Commits**: Use descriptive commit messages
- **Merges**: Fast-forward merges preferred

## Future Enhancements
- Add "no risk of identity theft" messaging
- Industry-specific landing pages
- Customer testimonials
- Integration documentation
- Pricing tiers
- Contact forms

## Notes
- Site is live and functional
- All major features implemented
- Mobile responsive
- Calculator working with animations
- Fonts loaded locally
- Smooth scroll animations
- Professional styling with gold accents

## Contact
- **Project**: BareBits Bitcoin Lightning Payment Solutions
- **Target**: Businesses in regulated industries
- **Goal**: Reduce payment processing fees and discrimination
- **Technology**: Bitcoin Lightning Network
