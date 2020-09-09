<template>
  <div>
    <div class="q-banner text-center relative-position" style="letter-spacing: 1px">
      <h2 class="text-white">
        IELTS
      </h2>
      <p style="text-align: center; margin: 0 300px; color: white; font-size: 16px">
        The International English Language Testing System (IELTS) is the world’s most popular English language
        proficiency test for higher education and global migration. More than 10,000 organizations globally trust IELTS,
        so when you take the test you can be confident that it is recognized by educational institutions, employers,
        governments, and professional bodies around the world. As one of the pioneers of four skills English language
        testing 30 years ago, IELTS continues to set the standard for English language testing today. Governments in
        Australia, Canada, New Zealand, and the United Kingdom use IELTS to process immigration applications.
      </p>
    </div>
    <div style="display: flex; margin-top: 50px; letter-spacing: 1px">
      <div style="margin-left: 200px; width: 1500px">
        <h2>
          Our Story
        </h2>
      </div>
      <div style="margin-right: 200px; width: 1500px; ">
        <p>
          Over the last few years, studying and taking online tests has become increasingly popular. Many people who
          want to have a good reputation at work or have a need to study abroad are those who have the most demand for
          IELTS certificates. But with the lack of time and money, taking the IELTS test directly has been something
          hard to afford for some people.
        </p>
        <p style="margin: 50px 0 50px 0">
          From the idea of giving candidates the opportunity to take a mock test that is as close to the real test as
          possible and then done 100% online, IeltsTream was created by us. IeltsTream provides the full 4 tests for 4
          IELTS skills including reading, writing, listening, and speaking. The reading test is administered online and
          is scored by the system, the listening and writing tests are scored by the examiner. Our examiners are either
          teachers or education professionals with accredited qualifications and expertise. In particular, the speaking
          test provides candidates with a 1: 1 interactive exam with the online examiner, bringing a most authentic
          test. The best practice test will help candidates have the best ability to get high scores on the IELTS exam.
          That's what the IeltsTream brings.

        </p>
      </div>
    </div>
    <div style="display: flex; margin-top: 50px; letter-spacing: 1px; background-color: #1D1D1D">
      <div style="margin-left: 200px; width: 1500px; text-transform: uppercase; color: white">
        <h2>
          Take your test
        </h2>
      </div>
      <div style="margin: auto auto; width: 1500px;">
        <q-btn size="20px" color="primary" to="/register" style="text-transform: uppercase">get started</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about_us",
  data() {
    return {}
  }
}
</script>

<style scoped>
.my-card {
  margin: 10px auto;
  width: 100%;
  max-width: 1500px
}

.q-banner {
  background: url("https://www.website.com/img/skin/aboutus/aboutUs_hero.png") center;
  background-size: cover;
  height: 600px;
}
.img{
  background: url("https://www.website.com/img/skin/aboutus/aboutUs_van.png") center;
  background-size: cover;
  height: 600px;
}
</style>
