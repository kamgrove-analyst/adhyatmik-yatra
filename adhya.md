```mermaid
graph TD
    A[Home (index.html)] --> B[About (about.html)]
    A --> C[Practices (practices.html)]
    A --> D[Offerings (offerings.html)]
    A --> E[Book Purohit (bookpurohit.html)]
    A --> F[Articles (insights-articles.html)]
    A --> G[Audio/Video Library (video-audio-library.html)]
    A --> H[Blog (blog.html)]
    A --> I[Contact (contact.html)]
    A --> J[Community (community.html)]
    A --> K[Resource Center (resource-center.html)]
    A --> L[Spiritual Travel (offerings.html#travel)]
    A --> M[Kashi Darshan (virtual-pilgrimage.html)]
    A --> N[Pind Daan (pind-daan.html)]
    A --> O[Vedic Astrology (vedic-astrology.html)]
    A --> P[Spiritual Counseling (spiritualcounseling.html)]
    A --> Q[Various Rituals & Ceremonies]
    Q --> D
    Q --> N
    Q --> O
    Q --> P

    subgraph Static Assets
        S1[CSS (styles.css, responsive.css, ...)]
        S2[JS (main.js, navigation.js, carousel.js)]
        S3[Images]
    end

    A -.-> S1
    A -.-> S2
    A -.-> S3
    B -.-> S1
    C -.-> S1
    D -.-> S1
    D -.-> S2
    D -.-> S3

    %% Testimonials and Carousels
    A --> R[Testimonial Section]
    A --> S[Circle Carousel (Meditation, Puja, Astrology, Community, etc.)]
```
