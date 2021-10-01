<template>
  <div>
    <img src="./assets/images/cognitoFormsLogo.png" />
    <div class="sansita"><h1>QUIZ</h1></div>
    <div id="quiz">
      <div v-if="questCount === 0">
        <h2>Welcome to the Cognito Forms Quiz!</h2>
        <h3>Things to remember:</h3>
        <p>* Once you move on from a question you cannot revisit it</p>
        <p>
          * You must answer the current question before moving on to the next
          one
        </p>
        <p class="p2">Click "Start Quiz" to begin.</p>
        <md-button class="mdbutton" @click="questCount++">Start Quiz</md-button>
      </div>

      <!--show summary div-->
      <div v-if="isQuizDone && end === true">
        <h2>Answer Summary:</h2>
        <p
          text-align="center"
          v-for="(ans, index) in userAnswers"
          v-bind:key="index"
        >
          Question {{ index }}:
          {{ specifiedQuestion(index).text }}
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

        <h4>{{ currentQuestion.text }}</h4>

        <!--display buttons for answers -->
        <v-btn
          block
          class="main1"
          v-for="answers in currentQuestion.answers"
          v-bind:key="answers"
          @click="
            saveAnswers(currentQuestion.text, answers);
            select();
          "
          v-bind:class="{ highlight: ansSelected(answers) }"
        >
          {{ answers }}
        </v-btn>
      </div>
    </div>
    <md-button
      :disabled="cannotContinue"
      @click="count()"
      class="buttonStyle"
      v-if="questCount > 0 && questCount < questions.length - 1"
    >
      Next Question
    </md-button>
    <md-button
      :disabled="cannotContinue"
      class="buttonStyle"
      v-if="questCount === questions.length - 1 && end != true"
      @click="end = true"
    >
      Submit Quiz
    </md-button>
    <md-button @click="retakeQuiz" class="buttonStyle" v-if="end === true">
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
    userAnswers: {},
    questCount: 0,
    end: false,
    selected: false,
  }),
  computed: {
    currentQuestion() {
      return this.questions[this.questCount];
    },
    cannotContinue() {
      return !this.userAnswers[this.questCount];
    },
    isQuizDone() {
      return Object.keys(this.userAnswers).length === this.questions.length - 1;
    },
  },
  methods: {
    count: function () {
      this.questCount++;
    },
    specifiedQuestion(index) {
      return this.questions[index];
    },
    saveAnswers(question, answers) {
      this.userAnswers = {
        ...this.userAnswers,
        [this.questCount]: answers,
      };
    },
    retakeQuiz() {
      this.userAnswers = {};
      this.questCount = 0;
      this.end = false;
    },
    select() {
      this.selected = true;
    },
    ansSelected(answer) {
      return this.userAnswers[this.questCount] === answer;
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

.mdbutton {
  background-color: rgb(231, 104, 20);
  padding: 3mm;
  border-radius: 0px;
  border-color: white;
  color: white;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  font-weight: 1000;
  margin-top: 10mm;
  margin-left: 75mm;
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

.v-btn {
  background-color: #fa8100;
}

.main1 {
  margin-top: 10px;
  color: #fa8100;
  font-weight: bolder;
}

.highlight {
  background-color: #ecba84 !important;
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
.p2 {
  font-size: 1pc;
  padding: 3mm;
}
.sansita {
  font-family: "Sansita", sans-serif;
}
</style>