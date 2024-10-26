<template>
    <div class="contact-section">
      <div class="hero-image">
        <img src="@/assets/about-heading.jpg" alt="Company Background" />
        <div class="overlay">
          <h1>Contact Us</h1>
        </div>
      </div>

<!-- Location and About Office Section -->
<section class="location-office-section" style="display: flex; gap: 20px; align-items: flex-start;">
  <!-- Location Section -->
  <div class="location-section" style="flex: 2;">
    <h2>Our Location on Maps</h2>
    <div class="map-container">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15405.751079086556!2d120.5912753!3d15.1342844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f248cb3add45%3A0x6017a3a53379fe39!2sINDU!5e0!3m2!1sen!2sph!4v1728627333274!5m2!1sen!2sph" 
        width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>

  <!-- About Office Section -->
  <div class="about-office" style="flex: 1;">
    <h3>About our office</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed voluptate nihil eumester consectetur similiqu consectetur.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti.</p>
  </div>
</section>

  
      <!-- Contact Form Section -->
      <section class="contact-form-section">
        <h2>Send us a Message</h2>
        <form class="contact-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" placeholder="Full Name" />
          </div>
          <div class="form-group">
            <label for="email">E-Mail Address</label>
            <input type="email" id="email" placeholder="E-Mail Address" />
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" placeholder="Subject" />
          </div>
          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" rows="5" placeholder="Your Message"></textarea>
          </div>
          <button type="submit" class="submit-button">Send Message</button>
        </form>
      </section>
  
      <!-- Footer -->
      <footer class="footer">
        <p>COPYRIGHT © INDÛ. - DESIGN: LANCE CABE</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactPage",
  };
  </script>
  
  <style scoped>
 .contact-section {
    text-align: center;
  }
  
  /* Hero Section */
  .hero-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    text-align: center;
  }
  
  .hero-image {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .hero-content h1 {
    font-size: 3rem;
    color: #333;
  }
  
  .hero-content p {
    font-size: 1.2rem;
    color: #ff5733;
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
  
  /* Location Section */
  .location-section {
    margin: 40px 0;
  }
  
  .map-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  /* About Office Section */
  .about-office {
    text-align:left;
  }
  
  .about-office h3 {
    font-size: 1.8rem;
    margin-top: 20px;
  }
  
  .about-office p {
    font-size: 1rem;
    margin-top: 10px;
    color: #666;
  }
  
  /* Contact Form Section */
  .contact-form-section {
    margin: 40px 0;
  }
  
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    font-size: 1rem;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .submit-button {
    background-color: #ff5733;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #ff784e;
  }
  
  /* Footer */
  .footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px 0;
    background-color: #f1f1f1;
  }
  
  .footer p {
    font-size: 0.9rem;
    color: #333;
  }
  </style>
  