<template>
    <div class="about-section">
      <div class="hero-image">
        <img src="@/assets/about-heading.jpg" alt="Company Background" />
        <div class="overlay">
          <h1>Our Company</h1>
        </div>
      </div>
  
      <section class="about-content">
        <h2>Our Background</h2>
        <div class="about-description">
          <img src="@/assets/feature-image.jpg" alt="About Us Image" />
          <div class="text-content">
            <h3>Who we are & What we do?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              voluptate nihil eum consectetur similique? Consectetur, quod,
              incidunt, harum nisi dolores delectus reprehenderit voluptatem
              perferendis dicta dolorem non blanditiis ex fugiat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              consequuntur, modi mollitia corporis ipsa voluptate corrupti eum
              ratione ex ea praesentium quibusdam?
            </p>
          </div>
        </div>
      </section>
  
      <section class="team-section">
        <h2>Our Team Members</h2>
        <div class="team-grid">
          <div v-for="(member, index) in teamMembers" :key="index" class="team-member">
            <div :class="['member-image', { highlight: index === 2 }]">
              <img v-if="index !== 2" src="@/assets/team_01.jpg" alt="Team Member" />
              <div v-else class="highlight-placeholder">
                <i class="icon-placeholder"></i>
                <i class="icon-placeholder"></i>
              </div>
            </div>
            <h3>{{ member.name }}</h3>
            <p class="role">{{ member.role }}</p>
            <p class="description">{{ member.description }}</p>
          </div>
        </div>
      </section>
  
      <section class="infographic-section">
        <div class="infographic-content">
          <img src="@/assets/infographic.jpg" alt="Stores and Partners Infographic" />
        </div>
      </section>
  
      <footer>
        <p>COPYRIGHT © INDÛ. - DESIGN: LANCE CABE</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutUs',
    data() {
      return {
        teamMembers: [
          { name: 'Lance', role: 'Gewa na', description: 'Ditak Description.' },
          { name: 'Jimwell', role: 'Gewa na', description: 'Ditak Description.' },
          { name: 'Joriel', role: 'Gewa na', description: 'Ditak Description.' },
          { name: 'Marion', role: 'Gewa na', description: 'Ditak Description.' },
          { name: 'Benjamin', role: 'Gewa na', description: 'Ditak Description.' },
          { name: 'Michael', role: 'Gewa na', description: 'Ditak Description.' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .about-section {
    text-align: center;
  }
  
  .hero-image {
    position: relative;
    width: 100%;
    height: 300px;
  }
  
  .hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .overlay h1 {
    color: white;
    font-size: 3rem;
    font-weight: bold;
  }
  
  .about-content {
    margin: 2rem auto;
    max-width: 1200px;
  }
  
  .about-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .about-description {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .about-description img {
    width: 40%;
    margin-right: 2rem;
  }
  
  .text-content {
    flex: 1;
  }
  
  .text-content h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .text-content p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .team-section {
    margin-top: 3rem;
  }
  
  .team-section h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  
  .team-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
  
  .team-member {
    width: 200px;
    text-align: center;
  }
  
  .member-image {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #f0f0f0;
  }
  
  .member-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .highlight {
    background-color: #ff6151;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .highlight-placeholder {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .icon-placeholder {
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  
  .role {
    color: #ff6151;
    margin: 0.5rem 0;
  }
  
  .description {
    font-size: 1rem;
    color: gray;
  }
  
  .infographic-section {
    position: relative;
    height: 100%;
    background-image: url('@/assets/about-heading.jpg');
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    margin-top: 3rem;
    color: white;
  }
  
  .infographic-section h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
  }
  
  .infographic-content {
    position: relative;
    z-index: 2;
  }
  
  .infographic-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
    z-index: 1;
  }
  
  .infographic-section img {
    max-width: 100%;
    height: auto;
    z-index: 2;
    position: relative;
  }
  
  footer {
    text-align: center;
    padding: 20px;
    background-color: #f1f1f1;
  }
  
  </style>
  