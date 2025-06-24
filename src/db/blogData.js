// src/data/blogData.js
const blogPosts = [
  {
    title: "The Future of Artificial Intelligence in Web Development",
    content:
      "Artificial Intelligence (AI) has moved beyond science fiction and is now revolutionizing industries — including web development. From writing code snippets to optimizing backend queries, AI is becoming an integral part of a modern developer's toolkit.\n\nTools like GitHub Copilot and ChatGPT are reshaping how developers approach coding. Instead of spending hours writing repetitive boilerplate, developers can now generate entire modules, debug errors, and get real-time suggestions with AI support. Additionally, AI is improving user experience through personalized content recommendations, dynamic search, and predictive UI behavior.\n\nIn the near future, AI might even take care of A/B testing, accessibility improvements, and SEO optimization automatically. As exciting as it is, it also raises questions about code quality, ethical usage, and the need for human oversight. Developers must learn to adapt and collaborate with AI tools rather than resist them — those who do will thrive in this new AI-powered web landscape.",
    category: "Tech",
    coverImage:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    author: "665def123abc456789000001",
    likes: [
      "685a9073c964600194f86121",
      "685a9073c964600194f86123",
      "685a9074c964600194f86129",
    ],
    comments: [
      { user: "685a9073c964600194f86121", text: "Awesome" },
      { user: "685a9073c964600194f86123", text: "Great blog" },
    ],
  },
  {
    title: "5 Superfoods That Boost Brain Health",
    content:
      "The human brain requires a constant supply of nutrients to function optimally. While sleep and exercise play a role, your diet significantly impacts your cognitive abilities. Superfoods — rich in antioxidants, vitamins, and healthy fats — have been proven to boost brain function.\n\n1. **Blueberries**: Packed with antioxidants, they delay brain aging and improve memory.\n2. **Walnuts**: Rich in DHA, a type of Omega-3 fatty acid that boosts brain performance.\n3. **Dark Chocolate**: Contains flavonoids and caffeine for improved focus.\n4. **Fatty Fish**: Salmon and sardines are high in Omega-3s essential for brain development.\n5. **Green Tea**: L-theanine and caffeine improve alertness and mood.\n\nAdding these foods to your daily meals can help you think clearer, stay sharp longer, and even reduce the risk of neurological diseases like Alzheimer’s. Remember, your brain is what you feed it.",
    category: "Health",
    coverImage:
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg",
    author: "665def123abc456789000002",
    likes: ["685a9074c964600194f86127", "685a9074c964600194f86125"],
    comments: [
      { user: "685a9073c964600194f86121", text: "Great diet" },
      { user: "685a9074c964600194f86129", text: "Thankyou for information" },
    ],
  },
  {
    title: "Top 7 Street Foods You Must Try in Bangkok",
    content:
      "Bangkok is known worldwide for its vibrant street food scene. You’ll find mouthwatering dishes being served from stalls on every corner — offering everything from spicy soups to sweet desserts.\n\nStart your day with **Jok**, a rice porridge dish often served with a poached egg and pork. Later, dive into **Pad Thai**, stir-fried noodles with tamarind, lime, and peanuts. Try **Som Tum**, a spicy papaya salad, and cool down with **Coconut Ice Cream** served in a real coconut shell. Don’t forget the ever-popular **Mango Sticky Rice**.\n\nEvery food stall has its own story, and every bite delivers an explosion of flavor. What makes Bangkok street food special is its authenticity — recipes handed down over generations, often cooked in front of your eyes, all for under a dollar.",
    category: "Food",
    coverImage:
      "https://images.pexels.com/photos/2010701/pexels-photo-2010701.jpeg",
    author: "665def123abc456789000003",
    likes: ["685a9074c964600194f86129"],
    comments: [
      {
        user: "685a9074c964600194f86129",
        text: "Bangkok is my favourite country",
      },
    ],
  },
  {
    title: "Discovering the Hidden Gems of Northern Italy",
    content:
      "While most tourists flock to Venice and Milan, Northern Italy holds countless hidden gems. **Bergamo**, with its medieval old town and vibrant music scene, offers a more peaceful yet cultural experience. **Parma**, the birthplace of Parmesan cheese and Parma ham, is a paradise for food lovers.\n\nLakes like **Orta** and **Iseo** are quieter alternatives to Como, offering crystal waters and picturesque villages without the crowds. Take a wine tour in **Langhe**, explore Roman ruins in **Aosta**, or simply wander through charming cobbled streets while sipping a cappuccino.\n\nNorthern Italy blends history, food, and nature in a way few regions can. The secret? Go beyond the guidebook and get lost in the real Italy.",
    category: "Travel",
    coverImage:
      "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg",
    author: "665def123abc456789000004",
    likes: ["685a9074c964600194f86127", "685a9073c964600194f86123"],
    comments: [{ user: "685a9073c964600194f86123", text: "Beautiful scenery" }],
  },
  {
    title: "How to Start a Fitness Routine from Scratch",
    content:
      "Starting a fitness journey doesn’t mean spending hours at the gym. Begin with small, consistent steps. Choose exercises that align with your goals — weight loss, muscle gain, or general health.\n\nStart with 15–20 minutes of activity per day. Mix cardio (walking, jogging) with bodyweight strength workouts like push-ups and squats. Track your progress and celebrate milestones. Most importantly, listen to your body.\n\nNutrition matters too. Avoid processed foods and prioritize protein, vegetables, and healthy fats. Get 7–8 hours of sleep and stay hydrated.\n\nFitness is a lifestyle, not a 30-day challenge. Build habits slowly and focus on long-term results — your body will thank you.",
    category: "Health",
    coverImage:
      "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    author: "665def123abc456789000005",
    likes: [
      "685a9074c964600194f86127",
      "685a9074c964600194f86129",
      "685a9073c964600194f86123",
    ],
    comments: [
      {
        user: "685a9073c964600194f86123",
        text: "Will start fitness from today",
      },
    ],
  },
  {
    title: "Next.js vs. Remix: Which Framework Should You Choose?",
    content:
      "Nextjs and Remix are two powerful React meta-frameworks built for fullstack applications. While both offer SSR, routing, and optimization, they approach problems differently.\n\n**Next.js** is opinionated, backed by Vercel, and comes with out-of-the-box features like image optimization, API routes, and middleware. It’s great for companies that want convention over configuration.\n\n**Remix**, on the other hand, focuses on performance and progressive enhancement. It embraces web fundamentals like native form handling and loader functions. Developers enjoy finer control over caching, fetching, and accessibility.\n\nChoosing between them depends on your needs. Want a plug-and-play experience? Go Next.js. Need granular control and don’t mind learning curve? Try Remix.\n\nBoth are excellent. Your project size, team skills, and deployment setup should guide your decision.",
    category: "Tech",
    coverImage:
      "https://images.pexels.com/photos/5257266/pexels-photo-5257266.jpeg",
    author: "665def123abc456789000006",
    likes: ["685a9074c964600194f86125"],
    comments: [{ user: "685a9074c964600194f86125", text: "I love nextjs " }],
  },
  {
    title: "10 Quick and Healthy Snack Ideas",
    content:
      "Snacking doesn’t have to ruin your diet. In fact, it can be part of a healthy eating plan if done right. The key is choosing snacks that are high in protein, fiber, and healthy fats — and avoiding sugar and empty calories.\n\nTry:\n- Greek yogurt with honey\n- Roasted chickpeas\n- Apple slices with almond butter\n- Boiled eggs\n- Rice cakes with cottage cheese\n- Trail mix (no added sugar)\n- Smoothies with spinach and banana\n- Hummus with carrots\n- Tuna on whole grain crackers\n- Popcorn with olive oil\n\nThese snacks not only satisfy cravings but also keep your energy up. Prep them in advance to avoid reaching for chips!",
    category: "Food",
    coverImage:
      "https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg",
    author: "665def123abc456789000007",
    likes: ["685a9074c964600194f86127", "685a9073c964600194f86123"],
    comments: [{ user: "685a9074c964600194f86129", text: "Great diet tip" }],
  },
  {
    title: "Backpacking Through Nepal: What You Need to Know",
    content:
      "Nepal is a backpacker’s dream — stunning landscapes, warm people, rich culture, and affordable travel. Start in Kathmandu, explore temples like Swayambhunath and Pashupatinath, then move on to Pokhara, gateway to the Annapurna range.\n\nPlan for weather: avoid monsoon season (June–August). Pack layers for altitude changes. Always carry a water purifier and snacks when trekking.\n\nMust-try treks: Annapurna Base Camp, Langtang Valley, and Poon Hill. Permits (TIMS and ACAP) are needed for most routes.\n\nBudget $20–30/day. Stay in tea houses, eat dal bhat, and respect local customs. Nepal is spiritual, wild, and unforgettable. You’ll come for the views, but stay for the soul.",
    category: "Travel",
    coverImage:
      "https://images.pexels.com/photos/1531660/pexels-photo-1531660.jpeg",
    author: "665def123abc456789000008",
    likes: ["685a9074c964600194f86125"],
    comments: [
      {
        user: "685a9074c964600194f86125",
        text: "Nepal is my favourite country",
      },
    ],
  },
  {
    title: "How Meditation Improves Mental Health",
    content:
      "Meditation is not a fad. It’s a science-backed technique for improving mental clarity, emotional resilience, and even physical health. Studies show regular meditation lowers cortisol levels, improves focus, and enhances mood.\n\nStart with just 5 minutes a day. Sit still, close your eyes, and focus on your breath. Use apps like Headspace or Calm if needed.\n\nDifferent techniques include mindfulness, loving-kindness, body scan, and transcendental meditation. Explore to find what suits you.\n\nThe key is consistency. Meditate daily — not perfectly — and over time, you’ll notice better sleep, less anxiety, and greater self-awareness.",
    category: "Health",
    coverImage:
      "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    author: "665def123abc456789000009",
    likes: ["685a9073c964600194f86121"],
    comments: [
      {
        user: "685a9073c964600194f86121",
        text: "Meditation is really good for health",
      },
    ],
  },
  {
    title: "How To Make Authentic Margherita Pizza at Home",
    content:
      "There’s something magical about a good Margherita pizza. With just five ingredients — dough, tomatoes, mozzarella, basil, and olive oil — you can recreate the classic Neapolitan taste at home.\n\nStart with good dough: high-protein flour, long fermentation, and high-heat baking (a pizza stone helps!). Use San Marzano tomatoes for the base, buffalo mozzarella for melt, and fresh basil for aroma.\n\nDrizzle olive oil before baking and again after. Bake at the highest oven temperature for 6–8 minutes.\n\nSimple, but perfect. Your kitchen will smell like a pizzeria in Naples!",
    category: "Food",
    coverImage:
      "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg",
    author: "665def123abc456789000010",
    likes: ["685a9074c964600194f86129"],
    comments: [
      {
        user: "685a9074c964600194f86129",
        text: "Pizza is one of my favourite",
      },
    ],
  },
];
export default blogPosts;
