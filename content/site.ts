export type ValueToken = string;

export type CaseStudySection =
    | {
        type: 'hero';
        image: string;
        mobileImage?: string;
        title: string;
        subtitle?: string;
        meta: { label: string; value: string }[];
        footnote?: string;
        liveUrl?: string;
        ctaLabel?: string;
        buttonColor?: string;
    }
    | {
        type: 'tldr';
        intro: string;
        title?: string;
        cards: { title: string; description: string; image: string }[];
    }
    | {
        type: 'problem-context';
        intro: string;
        cards: { title: string; description: string }[];
        footer: string;
    }
    | {
        type: 'constraints';
        title: string;
        cards: { title: string; description: string }[];
    }
    | {
        type: 'approach';
        title: string;
        image1?: string; // low fidelity (optional for cards variant)
        image2?: string; // high fidelity (optional for cards variant)
        variant?: 'default' | 'cards';
        backgroundColor?: string;
        steps: { title: string; description: string; icon?: string }[];
    }
    | {
        type: 'key-decisions';
        title: string;
        decisions: {
            id: string; // e.g., "01"
            title: string;
            image: string; // placeholder path
            description: string;
            rationale: string | string[];
            tradeoff: string;
            evidence?: string;
            backgroundColor?: string;
        }[];
    }
    | {
        type: 'what-i-shipped';
        title: string;
        items: {
            id: string;
            label: string;
            description: string[]; // bullet points
            media: string; // video/image placeholder
        }[];
    }
    | {
        type: 'proxies';
        title: string;
        description: string;
        items: {
            id: string;
            title: string;
            points: string[];
            variant: 'default' | 'card'; // default = text only, card = beige background
        }[];
    }
    | {
        type: 'measurement-plan';
        title: string;
        description: string;
        items: {
            title: string;
            subtitle: string;
            steps: string;
            goal: string;
        }[];
    }
    | {
        type: 'challenges';
        title: string;
        items: {
            id: string;
            title: string;
            description: string;
            solutions: string[];
        }[];
    }
    | {
        type: 'collaboration';
        title: string;
        description: string;
        items: string[];
        image: string;
    }
    | {
        type: 'iteration-roadmap';
        title: string;
        items: {
            text: string;
            position: 'top' | 'bottom'; // To place above or below the road
            column: number; // To roughly align horizontally (1-3 for top, 4-5 for bottom)
        }[];
    }
    | {
        type: 'reflection';
        title: string;
        heading: string;
        content?: { text: string; strong?: boolean }[];
        items?: { label: string; text: string }[];
    }
    | {
        type: 'design-execution';
        title: string;
        variant?: 'dark' | 'light';
        intro?: string;
        items: {
            title: string;
            description: string;
            image?: string; // Optional path, if missing render placeholder
        }[];
    }
    | {
        type: 'testing-results';
        title: string;
        rounds: {
            id: string;
            title: string;
            subtitle: string;
            stats: {
                label: string;
                value: string;
                description: string;
            }[];
        }[];
    }
    | {
        type: 'iteration-gallery';
        title: string;
        items: {
            title: string;
            whatWeSaw: string;
            whatIChanged: string;
            image: string; // Placeholder
        }[];
    }
    | { type: 'text'; content: string[] };

export interface Project {
    slug: string;
    title: string;
    role: string;
    timeframe: string;
    problem: string;
    outcome: string;
    tags: string[];
    thumbnail?: string; // Optional path to image
    logo?: string; // Logo for the sidebar
    video?: string; // Video loop for the preview
    summary?: string; // The big headline (e.g. "Turning podcast listeners...")
    details?: string[]; // Rolling text details
    content: CaseStudySection[]; // New modular content array
    nextProject?: Project;
}

export interface SiteConfig {
    meta: {
        name: string;
        tagline: string;
        email: string;
        links: {
            linkedin: string;
            github?: string;
            twitter?: string;
        };
        resumeUrl: string; // Or path to file
    };
    header: {
        location: {
            label: string;
            value: string;
            timeZone: string;
        };
        currentRole: {
            label: string;
            value: string;
        };
        availability: {
            label: string;
            value: string;
        };
        cta: {
            label: string;
            href: string;
        };
    };
    navigation: {
        items: { label: string; href: string }[];
    };
    home: {
        hero: {
            headline: string;
            subhead: string;
            valueTokens: ValueToken[];
            primaryAction: {
                label: string;
                href: string;
            };
            secondaryAction: {
                label: string;
                href: string;
            };
        };
        mindset: {
            title: string;
            description: string;
            principles: {
                id: string;
                title: string;
                description: string;
            }[];
        };
        aboutTeaser: {
            content: string[];
            linkText: string;
            linkHref: string;
        };
        howIWork: {
            steps: {
                title: string;
                description: string;
            }[];
        };
    };
    projects: Project[];
}

export const siteConfig: SiteConfig = {
    meta: {
        name: "Manohar",
        tagline: "Product Designer",
        email: "hello@example.com",
        links: {
            linkedin: "https://linkedin.com/in/username",
            github: "https://github.com/username",
        },
        resumeUrl: "/resume",
    },
    header: {
        location: {
            label: "0→1 Product Shipper",
            value: "From ambiguity → shipped v1",
            timeZone: "America/New_York",
        },
        currentRole: {
            label: "Systems-First Designer",
            value: "States, scale, consistency",
        },
        availability: {
            label: "Research-Led Decisions",
            value: "Evidence → tradeoffs → UI",
        },
        cta: {
            label: "Get in touch",
            href: "mailto:hello@example.com",
        }
    },
    navigation: {
        items: [
            { label: "Home", href: "/" },
            { label: "Work", href: "/#work" },
            { label: "Explore", href: "/explore" }, // Assumption, update as needed
        ]
    },
    home: {
        hero: {
            headline: "Product designer with an engineering backbone and a systems-first mindset.",
            subhead: "I map workflows, identify leverage points, and craft interfaces that feel simple and inevitable—especially in complex, systems-heavy products.",
            valueTokens: ["Systems-first", "AI UX + trust", "Shipped work"],
            primaryAction: {
                label: "View Work",
                href: "#work",
            },
            secondaryAction: {
                label: "Contact",
                href: "mailto:hello@example.com",
            },
        },
        mindset: {
            title: "Mindset",
            description: "I think of products as living systems. They’re not just screens; they involve behaviors, incentives, support loops, and moments of trust that evolve over time. I design by mapping the system, finding what’s causing friction, and building the smallest set of changes that meaningfully shift outcomes.",
            principles: [
                {
                    id: "01",
                    title: "Systems-first thinking",
                    description: "I start with incentives, bottlenecks, and team constraints — not just UI screens.",
                },
                {
                    id: "02",
                    title: "Clarity & craft",
                    description: "Hierarchy, interaction, and accessibility come first. If it’s not readable and usable, it’s not done.",
                },
                {
                    id: "03",
                    title: "Shipping mindset",
                    description: "I iterate fast, communicate clearly, and deliver polished work that survives real constraints.",
                },
            ],
        },
        aboutTeaser: {
            content: [
                "I believe clarity is the most important metric. My background in engineering allows me to bridge the gap between design intent and shipped reality.",
                "When I'm not designing, I practice meditation to sharpen my attention and ability to see systems clearly.",
            ],
            linkText: "More about me",
            linkHref: "/about",
        },
        // howIWork removed or kept if needed, but mindset seems to replace it visually?
        // Keeping it for now to avoid breaking types if used elsewhere, but data above is the new source of truth for the section.
        howIWork: {
            steps: [
                {
                    title: "Identify leverage points",
                    description: "Start with incentives, bottlenecks, and hard constraints.",
                },
                {
                    title: "Map workflows & edge cases",
                    description: "Don't just design the happy path. Detail the system.",
                },
                {
                    title: "Prototype & Validate",
                    description: "Get to something tangible quickly to test assumptions.",
                },
                {
                    title: "Ship, Measure, Iterate",
                    description: "Impact is measured in production, not Figma files.",
                },
            ],
        },
    },
    projects: [
        {
            slug: "cooperant-learning",
            title: "Cooperant Learning",
            role: "Product Designer (0→1) + Implementation",
            timeframe: "2023 — 2024",
            summary: "Turning podcast listeners into CEU earners.",
            problem: "A Learning + Commerce platform (Designed + Built)",
            outcome: "Shipped v1 dashboard adopted by 5 Fortune 500 clients.",
            tags: ["AI/ML", "Data Viz", "Systems Design"],
            thumbnail: "/images/cl-dashboard.png", // Placeholder
            logo: "/images/cl-logo.png", // Placeholder
            video: "/videos/cooperant_learning_lead.mp4",
            details: [
                "Role: Product Designer (0→1) + Implementation",
                "Scope: UX strategy, IA, interaction design, UI + design system, WordPress implementation, QA, handoff documentation",
                "Timeline: ~4 months",
                "Platform: WordPress + LearnDash (LMS) + WooCommerce (commerce) + custom components/styles",
                "Primary users: BCBAs, RBTs, clinic admins (internal training as an add-on)"
            ],
            content: [
                {
                    type: 'hero',
                    image: "/images/case-studies/cooperant-learning/hero-banner.png",
                    mobileImage: "/images/case-studies/cooperant-learning/hero-mobile.jpg",
                    title: "Turning podcast listeners into CEU* earners.",
                    meta: [
                        { label: "Role", value: "Product Designer (0→1) +\nImplementation" },
                        { label: "Scope", value: "UX strategy, IA, interaction design, UI + design system, iPad app, WordPress implementation, QA, handoff documentation" },
                        { label: "Platform", value: "WordPress + LearnDash (LMS) +\nWooCommerce (commerce) + custom components/styles" },
                        { label: "Primary users", value: "BCBAs, RBTs, clinic admins (internal training as an add-on)" },
                        { label: "Timeline", value: "~4 months" }
                    ],
                    subtitle: "* Continuing Education Units (CEUs) are credits that measure participation in professional development programs.",
                    liveUrl: "https://cooperantlearning.com",
                    buttonColor: "#A29BFE"
                },
                {
                    type: 'tldr',
                    intro: "Cooperant Learning is an evidence-based continuing education platform where behavior professionals can discover CEU content, purchase quickly, complete quizzes, and download certificates—with progress tracked in a purpose-built learning dashboard.",
                    cards: [
                        {
                            title: "One canonical course URL + state-based UI",
                            description: "(logged out → logged in → purchased → completed) keeps sharing simple and reduces duplicate templates/edge cases.",
                            image: "/videos/case-studies/cooperant-learning/tldr-card-1.mp4"
                        },
                        {
                            title: "User benefit:",
                            description: "Clear “what to do next” CTAs across episodes/courses + a single place to track CEUs and download certificates.",
                            image: "/videos/case-studies/cooperant-learning/tldr-card-2.mp4"
                        },
                        {
                            title: "Business benefit:",
                            description: "A smoother discovery→purchase flow and a scalable content system designed to convert free listening into paid CEU completion.",
                            image: "/videos/case-studies/cooperant-learning/tldr-card-3.mp4"
                        }
                    ]
                },
                {
                    type: 'problem-context',
                    intro: "Sparks Behavioral Services had high-quality educational content (podcasts + trainings), but the experience needed to do three things exceptionally well:",
                    cards: [
                        {
                            title: "Build trust fast",
                            description: "(CEUs require credibility, policies, and clarity)"
                        },
                        {
                            title: "Reduce friction in",
                            description: "the “pay → quiz → certificate” journey"
                        },
                        {
                            title: "Support multiple audiences",
                            description: "(BCBAs, RBTs, admins) without turning the platform into a maze"
                        }
                    ],
                    footer: "This wasn’t a redesign—it was a new product: define the core journeys, build the system, and ship something stable enough for real users and real transactions."
                },
                {
                    type: 'constraints',
                    title: "Constraints",
                    cards: [
                        {
                            title: "0→1 product:",
                            description: "no legacy UX to inherit; everything needed definition from first principles"
                        },
                        {
                            title: "New launch:",
                            description: "meaningful analytics weren\u2019t available yet (so impact is framed as proxies + measurement plan)"
                        },
                        {
                            title: "Platform constraints:",
                            description: "LearnDash and WooCommerce each have strong opinions (templates, states, account surfaces)"
                        },
                        {
                            title: "High trust + compliance:",
                            description: "CEU workflows need clarity, policy visibility, and certificate reliability"
                        },
                        {
                            title: "Speed matters:",
                            description: "content had to be publishable by the team without breaking layouts or logic"
                        }
                    ]
                },
                {
                    type: 'approach',
                    title: "Approach (what I actually did)",
                    image1: "/images/case-studies/cooperant-learning/approach-lowfi.png",
                    image2: "/images/case-studies/cooperant-learning/approach-highfi.png",
                    steps: [
                        {
                            title: "Benchmark + define the journeys",
                            description: "(discovery → purchase → learning → certificate)"
                        },
                        {
                            title: "Low-fidelity wireframes",
                            description: "to lock IA, states, and page responsibilities"
                        },
                        {
                            title: "Design system",
                            description: "to ensure consistency across marketing, listings, and LMS/commerce templates"
                        },
                        {
                            title: "Implementation + QA",
                            description: "(state handling, logged out vs logged in experiences, purchase flows, certificate loop)"
                        },
                        {
                            title: "Handoff",
                            description: "(documented how to upload episodes/courses, set product IDs, and avoid breaking templates/styles)"
                        }
                    ]
                },
                {
                    type: 'key-decisions',
                    title: "Key Decisions",
                    decisions: [
                        {
                            id: "01",
                            title: "Use one canonical course URL with state-based UI",
                            image: "/images/cl-key-decision-1.png",
                            description: "Instead of splitting “logged out,” “purchase,” and “completed” into separate pages, I designed a single course page that changes its UI based on user state.",
                            rationale: [
                                "Sharing is simpler (one link works for everyone)",
                                "UI stays consistent while CTAs change meaningfully",
                                "Fewer templates reduces breakage risk as content scales"
                            ],
                            tradeoff: "State logic must be explicit and tested. I handled this by defining clear states and ensuring every CTA returns users to the same course URL after gating."
                        },
                        {
                            id: "02",
                            title: "Gate login/register only at the moment of intent",
                            image: "/images/cl-key-decision-2.png",
                            description: "Users can browse freely. Login/register triggers only when a user tries to Add to cart / Enroll / Start / Take quiz.",
                            rationale: "Forcing account creation too early kills momentum. Gating only on intent preserves discovery while still protecting paid learning actions.",
                            tradeoff: "This requires careful “return-to-context” handling after login. The experience was designed so users land back where they started (course page or listing), not dumped somewhere generic.",
                            backgroundColor: "#242424"
                        },
                        {
                            id: "03",
                            title: "Separate “Learning Dashboard” from “My Account”",
                            image: "/images/cl-key-decision-3.png",
                            description: "Learning Dashboard = progress, courses in progress/completed, CEUs earned, certificates\nMy Account = orders, downloads, addresses, payment methods, profile/password",
                            rationale: "LearnDash and WooCommerce both offer “account-like” areas; combining them often creates confusion. Separation keeps each space clean and predictable.",
                            tradeoff: "Users need a simple bridge between these spaces. I added clear cross-links (“My Account” and “Edit Profile”) and consistent navigation patterns."
                        }
                    ]
                },
                {
                    type: 'what-i-shipped',
                    title: "What shipped (v1 scope)",
                    items: [
                        {
                            id: "01",
                            label: "Discovery + trust",
                            description: [
                                "Home page positioned around the core promise: Listen. Learn. Earn CEUs.",
                                "About + Contact pages with FAQs and support clarity",
                                "Clear ACE/provider trust cues and policy access (privacy/terms/CEU policy)"
                            ],
                            media: "/videos/case-studies/cooperant-learning/what-shipped-discovery.mp4"
                        },
                        {
                            id: "02",
                            label: "Listings + search",
                            description: [
                                "Courses listing with filters/tags (RBT, specialty, parents, etc.)",
                                "Podcast & CEU listing with *latest episode* emphasis + browseable grid"
                            ],
                            media: "/videos/case-studies/cooperant-learning/what-shipped-listing.mp4"
                        },
                        {
                            id: "03",
                            label: "Episode → CEU flow",
                            description: [
                                "Episode page with audio experience + CEU CTA, tabs for notes/resources/transcripts"
                            ],
                            media: "/videos/case-studies/cooperant-learning/what-shipped-episode.mp4"
                        },
                        {
                            id: "04",
                            label: "Course page states",
                            description: [
                                "Logged-out: preview + objectives + “Login to access”",
                                "Logged-in / not purchased: add-to-cart / enroll CTAs",
                                "Purchased: start/continue + take quiz",
                                "Completed: download/print certificate + dashboard access"
                            ],
                            media: "/videos/case-studies/cooperant-learning/tldr-card-1.mp4"
                        },
                        {
                            id: "05",
                            label: "Learning & account",
                            description: [
                                "Learning Dashboard: progress + completed courses + certificate access",
                                "My Account / My Profile separation for commerce + identity tasks"
                            ],
                            media: "/videos/case-studies/cooperant-learning/tldr-card-2.mp4"
                        },
                        {
                            id: "06",
                            label: "Reliability basics",
                            description: [
                                "Email verification + password reset flow tested end-to-end",
                                "Purchase flow tested through WooCommerce order confirmation"
                            ],
                            media: "/videos/case-studies/cooperant-learning/what-shipped-reliability.mp4"
                        }
                    ]
                },
                {
                    type: 'proxies',
                    title: "Proxies (what I can credibly claim now)",
                    description: "Because the product is newly launched, I’m framing impact using defensible proxies rather than fabricated analytics.",
                    items: [
                        {
                            id: "Proxy 1",
                            title: "State-based UI reduces complexity + confusion",
                            points: [
                                "1 canonical course URL supports multiple user states",
                                "4 explicit states ensure every user sees the correct next step"
                            ],
                            variant: 'default'
                        },
                        {
                            id: "Proxy 2",
                            title: "Login friction minimized without blocking discovery",
                            points: [
                                "Login/register only appears when the user attempts gated actions",
                                "Users return to the original context after login"
                            ],
                            variant: 'card'
                        },
                        {
                            id: "Proxy 3",
                            title: "Certificate retrieval becomes self-serve",
                            points: [
                                "Certificates are surfaced in the dashboard and tied to completion states",
                                "The “what now?” step after completion is explicit (Download/Print Certificate)"
                            ],
                            variant: 'card'
                        },
                        {
                            id: "Proxy 4",
                            title: "Design system improves consistency + scalability",
                            points: [
                                "Shared components (cards, buttons, chips, forms) reduce drift across templates",
                                "Accessibility considerations baked into components (focus, labels, contrast)"
                            ],
                            variant: 'default'
                        }
                    ]
                },
                {
                    type: 'measurement-plan',
                    title: "Measurement plan (what we’ll track once analytics matures)",
                    description: "This is what I designed the product to measure (and how I’d validate success)",
                    items: [
                        {
                            title: "Funnel",
                            subtitle: "(Discovery → Purchase)",
                            steps: "Listing view → course/episode view → add-to-cart → checkout start → purchase success",
                            goal: "Goal: identify drop-off points and reduce friction."
                        },
                        {
                            title: "Activation",
                            subtitle: "(Purchase → Learning)",
                            steps: "Purchase success → course start → quiz start",
                            goal: "Goal: ensure buyers actually begin learning quickly."
                        },
                        {
                            title: "Completion",
                            subtitle: "(Learning → CEU)",
                            steps: "Quiz attempts → pass rate → certificate download/print",
                            goal: "Goal: make CEU earning reliable and easy to prove."
                        },
                        {
                            title: "Support load",
                            subtitle: "(Self-serve health)",
                            steps: "Top contact reasons (certificate, login, purchase, access)",
                            goal: "Goal: reduce recurring confusion via UX + FAQ placement."
                        },
                        {
                            title: "Qualitative checks",
                            subtitle: "(early, fast, defensible)",
                            steps: "5-user task validation: “buy a CEU,” “complete quiz,” “find certificate,” “reset password”",
                            goal: "Heuristic/accessibility audit on key pages"
                        }
                    ]
                },
                {
                    type: 'challenges',
                    title: 'Challenges & how I handled them (the "messy middle")',
                    items: [
                        {
                            id: "01",
                            title: "Multiple platforms, one user experience",
                            description: "LearnDash and WooCommerce each create their own “shape” of UI and account behavior. I unified the experience by:",
                            solutions: [
                                "Defining clear surface ownership (learning vs commerce)",
                                "Standardizing components via the design system",
                                "Testing each state so CTAs never contradict the user’s reality (logged out vs enrolled vs completed)"
                            ]
                        },
                        {
                            id: "02",
                            title: "Keeping the experience scannable",
                            description: "This platform serves busy professionals. I used:",
                            solutions: [
                                "Strong CTA hierarchy",
                                "Short, repeatable patterns (cards, tabs, chips)",
                                "“One obvious next step” per state"
                            ]
                        }
                    ]
                },
                {
                    type: 'collaboration',
                    title: "Collaboration & handoff",
                    description: "I worked directly with stakeholders to ensure the platform could be operated without me",
                    items: [
                        "Defined a repeatable episode/course publishing process",
                        "Documented how product IDs map to episodes and how templates should be used",
                        "Provided a handoff brief to prevent accidental layout breakage (theme/template/CSS guardrails)"
                    ],
                    image: "/images/case-studies/cooperant-learning/collaboration-handoff.png"
                },
                {
                    type: 'iteration-roadmap',
                    title: "What I’d do next (iteration roadmap)",
                    items: [
                        { text: "Instrument analytics + event tracking (funnel + completion + support reasons)", position: 'top', column: 1 },
                        { text: "Run 5–8 usability sessions focused on purchase and certificate retrieval", position: 'top', column: 2 },
                        { text: "Mobile stress-test key pages (episode, course states, checkout, dashboard tables)", position: 'top', column: 3 },
                        { text: "Content ops hardening (templates, validation checks, admin UX)", position: 'bottom', column: 2 }, // Offset
                        { text: "Conversion experiments (CTA wording, episode → CEU framing, trust modules placement)", position: 'bottom', column: 3 }
                    ]
                },
                {
                    type: 'reflection',
                    title: "Reflection (why this project matters)",
                    heading: "Cooperant Learning is the kind of product design work I want to do",
                    content: [
                        { text: "Full-stack UX (" },
                        { text: "strategy → system → UI → real implementation", strong: true },
                        { text: ") on a platform where trust, clarity, and flow directly impact whether users can earn credit and prove it professionally." }
                    ]
                }
            ],
            nextProject: {
                slug: "senior-mode-android",
                title: "Senior Mode for Android",
                role: "Product Designer",
                timeframe: "2024",
                summary: "Simplifying Android for seniors.",
                problem: "Android interface is too complex for seniors.",
                outcome: "Increased adoption by seniors.",
                tags: ["Android", "Accessibility", "Research"],
                thumbnail: "/images/senior-mode-thumb.png", // Placeholder
                logo: "/images/senior-mode-logo.png", // Placeholder
                video: "", // Placeholder
                details: [
                    "Role: Product Designer",
                    "Scope: UX/UI",
                    "Timeline: 2024"
                ],
                content: [],
            },
        },
        {
            slug: "senior-mode-android",
            title: "Senior Mode for Android",
            role: "Product Designer",
            timeframe: "2024",
            summary: "Preventing “my phone is broken” moments for seniors.",
            problem: "A state-first Android Senior Mode + caregiver recovery layer (tested + iterated).",
            outcome: "Increased adoption by seniors.",
            tags: ["Android", "Accessibility", "Research"],
            thumbnail: "/images/senior-mode-thumb.png", // Placeholder
            logo: "/images/senior-mode-logo.png",
            video: "/videos/case-studies/senior-mode/senior-mode-preview.mp4",
            details: [
                "Type: Concept + high-fidelity prototype (Figma)",
                "Role: End-to-end (research → IA → UI → prototyping → testing → iteration)",
                "Duration: ~1.5 months • Platform: Android (Senior phone) + caregiver companion flow",
                "Audience: Seniors (60–80) + caregivers (children / helpers), India-based testing"
            ],
            content: [
                {
                    type: 'hero',
                    image: "/images/case-studies/senior-mode/hero-banner.jpg",
                    mobileImage: "/images/case-studies/senior-mode/hero-mobile.jpg",
                    title: "Senior Mode for Android",
                    subtitle: "Make critical phone state obvious + enable one-tap recovery when accidental setting changes happen.",
                    meta: [
                        { label: "Role", value: "Product Designer (self-initiated) — end-to-end" },
                        { label: "Scope", value: "Research + interaction/UI + prototyping + usability testing + iteration" },
                        { label: "Platform", value: "Android (concept) + Figma interactive prototype" },
                        { label: "Primary users", value: "Seniors (60–<80) + caregivers (adult children / helpers)" },
                        { label: "Timeline", value: "~1.5 months" },
                        { label: "Testing", value: "Remote moderated usability testing" },
                        { label: "Participants", value: "10 seniors + 8 caregivers (India)" }
                    ],
                    liveUrl: "#", // Placeholder as requested (link: none) but label needed
                    ctaLabel: "OPEN PROTOTYPE",
                    buttonColor: "#C58F9D"
                },
                {
                    type: 'tldr',
                    title: "Outcome Summary (0–20 seconds)",
                    intro: "Senior Mode simplifies the smartphone experience to reduce anxiety and support load, validated through iterative testing with seniors and caregivers.",
                    cards: [
                        {
                            title: "Prevent accidental settings changes from turning into “my phone is broken” moments.",
                            description: "Senior Mode makes critical device state obvious (ringer / silent / connectivity basics) and reduces the chance of accidental changes causing stress or missed calls.",
                            image: "/videos/case-studies/senior-mode/outcome-1.mp4"
                        },
                        {
                            title: "Less stress for seniors. Less panic + support load for caregivers.",
                            description: "Seniors regain confidence because the phone behaves predictably. Caregivers get a faster way to restore the intended setup when something goes off-track.",
                            image: "/videos/case-studies/senior-mode/outcome-3.mp4"
                        },
                        {
                            title: "Validated with seniors + caregivers, then iterated and re-tested.",
                            description: "Remote moderated usability testing with 10 seniors + 8 caregivers (India), followed by a V2 iteration and a micro-test to check if the fixes improved the earlier issues.",
                            image: "/videos/case-studies/senior-mode/outcome-2.mp4"
                        }
                    ]
                },
                {
                    type: 'problem-context',
                    intro: "I kept seeing the same pattern (including in my own family): a senior accidentally changes a setting (often Silent, sometimes Wi-Fi, brightness, or rotate) and then everything spirals.",
                    cards: [
                        {
                            title: "Senior experience",
                            description: "“Something is wrong. I don’t want to touch it.” Confusion turns into paralysis."
                        },
                        {
                            title: "Caregiver experience",
                            description: "Missed calls, anxiety, repeated troubleshooting, and time lost doing remote \"phone support.\""
                        },
                        {
                            title: "Root issue",
                            description: "Phones hide critical device state behind gestures and subtle UI cues. Seniors don’t fail because they’re “not smart.” They fail because the system doesn’t make state and recovery obvious."
                        }
                    ],
                    footer: "Design goal: Reduce communication blackouts by making phone state (especially sound) instantly legible for seniors and enabling fast, transparent caregiver recovery when something breaks."
                },
                {
                    type: 'design-execution',
                    title: "Design Principles",
                    items: [
                        {
                            title: "Make the phone’s status obvious",
                            image: "/images/case-studies/senior-mode/design-principle-1.jpg",
                            description: "Seniors shouldn’t have to interpret toggles—critical state like “Will my phone ring?” must be visible in plain language."
                        },
                        {
                            title: "Offer one clear next step",
                            image: "/images/case-studies/senior-mode/design-principle-2.jpg",
                            description: "When something goes wrong, the UI should present a single, safe action (fix it now / request help), not multiple paths."
                        },
                        {
                            title: "Build trust with transparency",
                            image: "/images/case-studies/senior-mode/design-principle-3.jpg",
                            description: "Caregiver help should never feel “mysterious”—show what changed, who changed it, and give the user control (log / disable help)."
                        }
                    ]
                },

                {
                    type: 'approach',
                    title: "Approach",
                    variant: 'cards',
                    backgroundColor: '#C58F9D',
                    steps: [
                        {
                            title: "Scoped the opportunity",
                            description: "Reviewed comparable solutions and sketched early flows to define what the prototype must prove.",
                            icon: "ScanSearch"
                        },
                        {
                            title: "Built the prototype",
                            description: "Created a fully wired high-fidelity flow for both seniors and caregivers.",
                            icon: "Layers"
                        },
                        {
                            title: "Designed the study",
                            description: "Defined 6 tasks, success criteria, and metrics (pass/fail, time, errors, confidence/trust/effort).",
                            icon: "ClipboardList"
                        },
                        {
                            title: "Ran remote sessions",
                            description: "Tested with 10 seniors and 8 caregivers, rotating task order to reduce learning bias.",
                            icon: "Video"
                        },
                        {
                            title: "Iterated and re-validated",
                            description: "Synthesized results, shipped a targeted V2, and micro-tested the riskiest flow to confirm improvement.",
                            icon: "RefreshCw"
                        }
                    ]
                },
                {
                    type: 'key-decisions',
                    title: "Key Decisions",
                    decisions: [
                        {
                            id: "01",
                            title: "Make sound state explicit on “Home” and “Controls”",
                            image: "/images/case-studies/senior-mode/decision-card-1.jpg",
                            description: "Surface “Phone will ring / Phone is silent” as readable language, not subtle UI state.",
                            rationale: "V1 showed seniors struggled with state interpretation, especially around Silent/Ringing—your core JTBD.",
                            tradeoff: "Uses premium screen space; slightly less “clean” than stock Android minimalism.",
                            evidence: "V1 blocker task (S2) dropped to 70% pass and drove most assistance; V2 micro-test restored state recognition to 100% on key surfaces."
                        },
                        {
                            id: "02",
                            title: "Fix discoverability: add an explicit “Controls” entry (not swipe-only)",
                            image: "/images/case-studies/senior-mode/decision-card-2.jpg",
                            backgroundColor: "#242424",
                            description: "Provide a visible Controls entry on Home so seniors aren’t required to discover a gesture.",
                            rationale: "Hidden interactions (swipe/scroll) caused avoidable friction in V1.",
                            tradeoff: "More UI elements competing for attention; Home must stay calm.",
                            evidence: "V2 micro-test showed discoverability improved, but some users still tried Search/top status first—so the Controls entry is necessary, not sufficient."
                        },
                        {
                            id: "03",
                            title: "Caregiver fixes apply instantly (for “safe” fixes), with audit + undo",
                            image: "/images/case-studies/senior-mode/decision-card-3.jpg",
                            description: "Allow caregivers to apply fixes immediately for low-risk changes (ringer/brightness), and log it on both devices.",
                            rationale: "The caregiver’s job is rapid recovery; delays increase stress and missed communication.",
                            tradeoff: "Reduces senior autonomy in the moment—so trust and reversibility must be explicit.",
                            evidence: "Testing synthesis recommends instant apply for safe fixes and adding “what will change” clarity + undo window cues."
                        }
                    ]
                },

                {
                    type: 'testing-results',
                    title: "What the testing proved (and where it broke)",
                    rounds: [
                        {
                            id: "Round 1",
                            title: "Round 1",
                            subtitle: "(full usability)",
                            stats: [
                                {
                                    label: "Seniors",
                                    value: "86.7%",
                                    description: "Overall pass rate across senior tasks, but one blocker dominated: fixing Silent via Quick Controls (S2)."
                                },
                                {
                                    label: "Caregivers",
                                    value: "100%",
                                    description: "pass rate across caregiver tasks; confidence ~5.6/7."
                                },
                                {
                                    label: "Segmentation",
                                    value: "25%",
                                    description: "Low device-familiarity seniors had 25% pass on S2 and 100% required help—this is the core risk segment you’re designing for."
                                },
                                {
                                    label: "",
                                    value: "",
                                    description: "I iterated on the existing designs based on the round one test outcome"
                                }
                            ]
                        },
                        {
                            id: "Round 2",
                            title: "Round 2",
                            subtitle: "(Targeted micro-validation; Post design Iteration)",
                            stats: [
                                {
                                    label: "Seniors",
                                    value: "100%",
                                    description: "State recognition: 100% on Home and Controls surfaces"
                                },
                                {
                                    label: "Seniors",
                                    value: "100%",
                                    description: "Fix-path speed: 100% success; median 20.5s to indicate the right action area (Controls) and median 13.5s to locate Sound in Quick Controls."
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'iteration-gallery',
                    title: "Iteration",
                    items: [
                        {
                            title: "Made “Will my phone ring?” impossible to miss.",
                            whatWeSaw: "Seniors noticed the small “Ringing” chip, but it didn’t translate into confidence about the phone’s actual state—or what to do next.",
                            whatIChanged: "Replaced subtle chips with a plain-language status tile (“Phone will ring”) and added an explicit Controls entry so recovery isn’t hidden.",
                            image: "/images/case-studies/senior-mode/iteration-1.jpg"
                        },
                        {
                            title: "Turned Quick Controls into a reliable recovery hub.",
                            whatWeSaw: "In V1, Quick Controls didn’t provide enough reassurance—Sound state felt easy to misread and Recovery didn’t feel like an immediate fallback.",
                            whatIChanged: "Elevated Sound into a top card (“Phone will ring” + Test ring) and surfaced Restore Senior defaults as a clear, one-swipe-away safety net.",
                            image: "/images/case-studies/senior-mode/iteration-2.jpg"
                        },
                        {
                            title: "Made the Sound action unmistakable (and confirmable).",
                            whatWeSaw: "Even after finding Sound, users could still hesitate on “which option is active?” and “did it actually change?”",
                            whatIChanged: "Made Sound label-first (“Phone will ring”), strengthened the Ringing/Silent control hierarchy, and added a prominent Test ring + visible reassurance (silent auto-reverts / restore defaults).",
                            image: "/images/case-studies/senior-mode/iteration-3.jpg"
                        }
                    ]
                },
                {
                    type: 'constraints',
                    title: "Constraints",
                    cards: [
                        {
                            title: "Recruiting & scheduling:",
                            description: "Seniors + caregivers had to be available together, remotely."
                        },
                        {
                            title: "Testing environment:",
                            description: "Remote moderated sessions require careful neutrality (avoid leading, but prevent drop-offs)."
                        },
                        {
                            title: "Device realism:",
                            description: "Prototype testing via Figma (Mirror/prototype) instead of a real Android build."
                        },
                        {
                            title: "Audience limits:",
                            description: "Participants were India-based (strong relevance, but still a sample limitation)."
                        },
                        {
                            title: "Ethics:",
                            description: "Verbal consent; no personally identifiable info captured (participant IDs only)."
                        }
                    ]
                },
                {
                    type: 'design-execution',
                    title: 'Trust, safety, and ethics',
                    variant: 'light',
                    intro: 'Because fixes can apply instantly (without senior consent in-the-moment), the design must communicate control and accountability:',
                    items: [
                        {
                            title: 'Kill switch / disable remote help',
                            description: '(with authentication) so seniors can opt out at any time.',
                            image: "/images/case-studies/senior-mode/trust-card-1.jpg"
                        },
                        {
                            title: 'What will change',
                            description: 'preview for higher-impact actions (recommended), while keeping instant apply for safe fixes.',
                            image: "/images/case-studies/senior-mode/trust-card-2.jpg"
                        },
                        {
                            title: 'Audit trail on both devices + visible',
                            description: '"what the senior will see" after applying a fix.',
                            image: "/images/case-studies/senior-mode/trust-card-3.jpg"
                        }
                    ]
                },
                {
                    type: 'what-i-shipped',
                    title: "What I built",
                    items: [
                        {
                            id: "01",
                            label: "Senior experience",
                            description: [
                                "Plain-language Ringing / Silent status",
                                "Visible Controls entry (no hidden gestures)",
                                "Guardrailed settings + Restore defaults",
                                "Request help → Sent confirmation"
                            ],
                            media: "/videos/case-studies/senior-mode/build-senior-experience.mp4"
                        },
                        {
                            id: "02",
                            label: "Caregiver experience",
                            description: [
                                "Alerts → Apply fix → Undo",
                                "Add/remove helpers",
                                "Helper requests + permission management",
                                "Transfer primary caregiver"
                            ],
                            media: "/videos/case-studies/senior-mode/build-caregiver-experience.mp4"
                        },
                        {
                            id: "03",
                            label: "Trust + safety layer",
                            description: [
                                "Scoped permissions + visible feedback",
                                "Audit trail + undo/revert",
                                "Senior-side kill switch (authenticated)"
                            ],
                            media: "/videos/case-studies/senior-mode/build-trust-safety.mp4"
                        },
                        {
                            id: "04",
                            label: "Edge-case handling",
                            description: [
                                "Offline/queued fixes with clear status",
                                "Recovery messaging when connectivity breaks"
                            ],
                            media: "/videos/case-studies/senior-mode/build-edge-cases.mp4"
                        },
                        {
                            id: "05",
                            label: "Onboarding Senior Mode",
                            description: [
                                "Explain changes before activation",
                                "Add/verify primary caregiver",
                                "Confirm defaults + logging/safety controls"
                            ],
                            media: "/videos/case-studies/senior-mode/build-onboarding.mp4"
                        }
                    ]
                },

                {
                    type: 'reflection',
                    title: "Reflection",
                    heading: "",
                    items: [
                        {
                            label: "What I learned",
                            text: "Older adults don’t struggle with “complexity” as much as invisible state and hidden interactions—designing for them means making status and next steps explicit."
                        },
                        {
                            label: "What I’d do differently",
                            text: "I’d plan a baseline comparison on stock Android from day one and capture more structured observational notes per task (not just scores) to strengthen the story."
                        },
                        {
                            label: "What’s next",
                            text: "Turn the concept into a lightweight spec + prototype package for an Android team (permissions model, audit/log requirements, edge cases), and validate with a slightly larger sample across device familiarity levels."
                        }
                    ]
                }
            ],
            nextProject: {
                slug: "black-baza",
                title: "Black Baza Coffee Co.",
                role: "Product Designer",
                timeframe: "2022",
                summary: "Redefining the coffee supply chain transparency.",
                problem: "High drop-off rate during the user onboarding flow.",
                outcome: "Increased conversion by 15% through simplified KYC flows.",
                tags: ["Mobile", "Fintech", "Growth"],
                logo: "/images/bb-logo.png",
                video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                details: [
                    "Role: Product Designer",
                    "Scope: End-to-end product design",
                    "Timeline: 2022",
                    "Platform: Mobile App",
                    "Primary users: Coffee Consumers"
                ],
                content: [],
            },
        },
        // {
        //     slug: "mochitta",
        //     title: "Mochitta",
        //     role: "Brand & Web Design",
        //     timeframe: "2024",
        //     summary: "Crafting a digital presence for a modern brand.",
        //     problem: "Lack of brand identity.",
        //     outcome: "Launched full brand suite.",
        //     tags: ["Branding", "Web"],
        //     logo: "/images/mochitta-logo.png",
        //     video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        //     content: [],
        // },
    ],
};
