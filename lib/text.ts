const texts = [
  `Collaborating with us means building your vision, your way. Inheaden is the only partner you will need to build digital products that make a difference. From research and strategy to implementation and maintenance - a lot of work goes into bringing an idea into the modern world. That’s why we’re here to help, every step of the way.`,
  `We are a fast-growing tech startup headquartered in Darmstadt, Germany. Incepted in 2017 by 3 co-founders, we now have a team of 20+ experts in Information Technology (IT) and Digital Product creation. Across borders and timezones, our shared values and unique perspectives bring us together. We encourage each other to learn, grow, and innovate so we can create tailored products and solutions.`,
  `From research and strategy to implementation and maintenance - a lot of work goes into bringing an idea into the modern world.	That’s why we’re here to help, every step of the way. Our team is young, bold, and full of enthusiasm. By carefully building lines of communication across domains, we have facilitated the sharing of thoughts and ideas so we can foster an environment of holistic growth for everybody.`,
  `We love what we do. Creating wonderful products and experiences has always been a foundational pillar of our work. To achieve the best outcomes, we learn, grow, and above all else, we have fun. We are knowledge-seekers. We encourage each other to be curious and to never stop learning. Curiosity and ingenuity is at the heart of our innovations.`,
  `The One Stop Shop for Digital solutions. Whether its building a product prototype or providing regular maintenance to ensure the highest quality or even implementing effective marketing strategies, we’re equipped to help you create the most unique and captivating digital solutions. You need services and tools to run your business, but we’re here to tell you that we’ve got you covered in every aspect your business needs to succeed in the digital world.`,
];

export function getRandomText() {
  return texts[Math.floor(Math.random() * texts.length)];
}
