<template>
    <div>
      <header class="hero-section">
        <div class="overlay">
          <div class="slider">
            <div class="slide" v-for="(slide, index) in slides" :key="index" :class="{ active: index === currentSlide }" :style="{ backgroundImage: `url(${slide.background})` }">
              <h1>{{ slide.title }}</h1>
              <h2>{{ slide.subtitle }}</h2>
            </div>
          </div>
        </div>
      </header>
  
      <section class="main-content">
          <div class="product-info">
              <h3>INDÛ Clothing</h3>
              <p>
                  Looking for the best products?
                  INDÛ is a Kapampangan word meaning "mother" or profoundly means
                  "where you came from" (Indung Ibtan). A local apparel brand started in
                  2014 & the concept is to promote local & homegrown goods which is
                  well known for its premium quality affordable crewneck shirts proudly
                  made in Angeles City.
              </p>
              <button @click="readMore">Read More</button>
          </div>
          <div class="product-image">
              <img src="@/assets/feature-image.jpg" alt="INDÛ Clothing Products" />
          </div>
      </section>
  
      <section class="product-highlight">
        <div class="highlight-content">
          <h4>Creative & Unique <span class="brand-name">INDÛ</span> Products</h4>
          <p>
            INDÛ clothing is a locally made merchandise featuring Kapampangan puns and facts.
          </p>
        </div>
        <button class="purchase-btn" @click="purchaseNow">Purchase Now</button>
      </section>
  
      <footer>
        <p>COPYRIGHT © INDÛ. - DESIGN: LANCE CABE</p>
      </footer>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        currentSlide: 0,
        slides: [
          {
            title: "Don’t let confusion cloud your vision",
            subtitle: "Stay focused!",
            background: require('@/assets/slide_01.jpg')
          },
          {
            title: "New design is out!",
            subtitle: "Stay tuned",
            background: require('@/assets/slide_02.jpg')
          },
          {
            title: "Stay warm and cozy!",
            subtitle: "Last Minute",
            background: require('@/assets/slide_03.jpg')
          }
        ],
      };
    },
    mounted() {
      this.startSlideshow();
    },
    methods: {
      startSlideshow() {
        setInterval(() => {
          this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        }, 5000);
      },
      readMore() {
        console.log("Read more clicked");
      },
      purchaseNow() {
        console.log("Purchase now clicked");
      },
    },
  };
  </script>
  
  <style scoped>
.hero-section {
    width: 2500px; 
    height: 820px; 
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden; 
}

.overlay {
    width: 100%; 
    height: 100%; 
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    color: white;
}

.slider {
    position: relative;
    width: 100%; 
    height: 100%; 
    display: flex;
    transition: transform 1s ease-in-out;
}

.slide {
    position: absolute;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    width: 100%; 
    height: 100%; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-size: cover; 
    background-position: center; 
}

.slide.active {
    opacity: 1; 
}

.slide h1 {
    font-size: 3em;
    margin-bottom: 10px;
}

.slide h2 {
    font-size: 2em;
}

  .main-content {
    display: flex;
    justify-content: center; 
    align-items: center; 
    padding: 50px;
}

.product-info {
    max-width: 600px; 
    margin-right: 20px; 
    text-align: left;
}

.product-image {
    flex-shrink: 0;
}

.product-image img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

  
  button {
    background-color: #ff4444;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .product-highlight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    margin: 40px;
  }
  
  .highlight-content h4 {
    font-size: 1.5em;
  }
  
  .highlight-content p {
    font-size: 1em;
  }
  
  .brand-name {
    color: #007bff;
  }
  
  .purchase-btn {
    background-color: #ff4444;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .purchase-btn:hover {
    background-color: #e63e3e;
  }
  
  footer {
    text-align: center;
    padding: 20px;
    background-color: #f1f1f1;
  }

  </style>
  