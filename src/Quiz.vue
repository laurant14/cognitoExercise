<template>
  <div>
    <img src="./assets/images/cognitoFormsLogo.png" />
    <div class="yaldevi"><h1>QUIZ</h1></div>
    <div id="quiz">
      <div v-if="questCount === 0">
        <h2>Welcome to the Cognito Forms Quiz!</h2>
        <h3>Things to remember:</h3>
        <p>* Once you move on from a question you cannot revisit it</p>
        <p>
          * You must answer the current question before moving on to the next
          one
        </p>
        <p>Click "Start Quiz" to begin.</p>
        <button class="raleway" @click="questCount++">Start Quiz</button>
      </div>

      <!--show summary div-->
      <div v-if="isQuizDone && end === true">
        <h2>Answer Summary:</h2>
        <p v-for="ans in userAnswers" v-bind:key="ans">
          {{ ans }}
        </p>
      </div>

      <!-- Question prompt and actual question-->
      <div v-if="questCount > 0 && end != true">
        <h3>
          Question
          {{ questCount }}
          : Please choose the best answer:
        </h3>

        <h3>{{ currentQuestion.text }}</h3>

        <!--display buttons for answers -->
        <button
          class="raleway"
          v-for="answers in currentQuestion.answers"
          v-bind:key="answers"
          @click="saveAnswers(answers)"
        >
          {{ answers }}
        </button>
      </div>
    </div>
    <button
      :disabled="cannotContinue"
      @click="count()"
      class="buttonStyle"
      v-if="questCount > 0 && questCount < questions.length - 1"
    >
      Next Question
    </button>
    <button
      class="buttonStyle"
      v-if="questCount === questions.length - 1 && end != true"
      @click="end = true"
    >
      Submit Quiz
    </button>
    <button @click="retakeQuiz" class="buttonStyle" v-if="end === true">
      Retake
    </button>
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
    userAnswers: {},
    questCount: 0,
    end: false,
  }),
  computed: {
    currentQuestion() {
      return this.questions[this.questCount];
    },
    cannotContinue() {
      console.log("length", Object.keys(this.userAnswers).length);
      console.log("cannot continue", !this.userAnswers[this.questCount]);
      return !this.userAnswers[this.questCount];
    },
    isQuizDone() {
      return Object.keys(this.userAnswers).length === this.questions.length - 1;
    },
  },
  methods: {
    count: function () {
      //this.showNext = false;
      this.questCount++;
      console.log("next clicked");
    },
    saveAnswers(answers) {
      this.userAnswers = {
        ...this.userAnswers,
        [this.questCount]: answers,
      };
      console.log(this.userAnswers);
    },
    retakeQuiz() {
      this.userAnswers = {};
      this.questCount = 0;
      this.end = false;
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
  background-color: rgb(69, 155, 156);
  border-radius: 0px;
  border-color: white;
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
}

#quiz {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 60px;
  margin: 5rem auto;
  padding: 2rem;
  max-width: 750px;
  color: rgb(3, 20, 77);
  background-color: rgb(218, 250, 248);
}

h1 {
  font-size: 3rem;
  text-align: center;
  color: rgb(231, 104, 20);
}
h2 {
  font-size: 2rem;
  text-align: center;
  color: rgb(3, 20, 77);
}
.dosis {
  font-family: "Dosis", sans-serif;
}
.indieFlower {
  font-family: "Indie Flower", sans-serif;
}
.yaldevi {
  font-family: "Yaldevi", sans-serif;
  font-weight: 200;
}
</style>