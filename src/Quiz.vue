
<template>
  <div>
    <img src="./assets/images/cognitoFormsLogo.png" />
    <div class="sansita"><h1>QUIZ</h1></div>
    <div id="quiz">
      <!--show summary div-->
      <div v-if="isQuizDone">
        <h2>Answer Summary:</h2>
        <p
          text-align="center"
          v-for="(ans, index) in userAnswers"
          v-bind:key="index"
        >
          Question {{ index + 1 }}:
          {{ questions[index].text }}
          {{ ans }}
        </p>
      </div>

      <!-- Question prompt and actual question-->
      <div v-if="ansQuestNum >= 0 && !isQuizDone">
        <h3>
          Question
          {{ ansQuestNum + 1 }}
          : Please choose the best answer:
        </h3>

        <h4>{{ currentQuestion.text }}</h4>

        <!-- Displaying array of answers with radio button-->
        <div
          class="answerButton"
          v-for="answers in currentQuestion.answers"
          v-bind:key="answers"
        >
          <input
            type="radio"
            v-model="userAnswers[ansQuestNum]"
            :value="answers"
          />
          <label>{{ answers }}</label>
        </div>
      </div>
    </div>

    <md-button @click="retakeQuiz" class="buttonStyle" v-if="isQuizDone">
      Retake
    </md-button>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    userAnswers: [],
  }),
  computed: {
    currentQuestion() {
      return this.questions[this.ansQuestNum];
    },
    ansQuestNum() {
      console.log(this.userAnswers);
      return this.userAnswers.length;
    },
    isQuizDone() {
      return this.userAnswers.length === this.questions.length;
    },
  },
  methods: {
    retakeQuiz() {
      this.userAnswers = [];
    },
  },
};
</script>

<style scoped>
button {
  background-color: rgb(231, 104, 20);
  border-radius: 0px;
  border-color: white;
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
}

.buttonStyle {
  margin-top: 0mm;
  margin-left: 57pc;
  background-color: rgb(69, 155, 156);
  padding: 3mm;
  border-radius: 0px;
  border-color: white;
  color: white;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  font-weight: 1000;
}

.answerButton {
  background-color: #f3b776;
  font-family: "Raleway", sans-serif;
  color: white;
  font-size: 5mm;
  font-weight: 900;
  text-align: center;
  margin-bottom: 8px;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

input[type="radio"] {
  position: absolute;
  width: 700px;
  height: 30px;
  opacity: 0;
  top: 10;
  left: 20;
  bottom: 0;
  right: 0;
}

.summary {
  font-size: 2rem;
  padding: 2mm;
}

#quiz {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 60px;
  margin-bottom: 0px;
  margin: 5rem auto;
  padding: 2rem;
  max-width: 750px;
  color: rgb(3, 20, 77);
  background-color: rgb(218, 250, 248);
}

h1 {
  font-size: 4rem;
  text-align: center;
  padding: 5mm;
  color: rgb(231, 104, 20);
}
h2 {
  white-space: nowrap;
  margin-bottom: 30px;
  padding: 1mm;
  font-size: 2rem;
  text-align: center;
  color: rgb(3, 20, 77);
}
h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}
h4 {
  margin-bottom: 30px;
  font-size: 1.1rem;
}
p {
  font-size: 1pc;
  padding: 2mm;
}

.sansita {
  font-family: "Sansita", sans-serif;
}
</style>