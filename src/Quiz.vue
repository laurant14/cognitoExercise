<template>
  <div>
    <img src="./assets/images/cognitoFormsLogo.png" />
    <div class="yaldevi"><h1>QUIZ</h1></div>
    <div id="quiz">
      <div v-if="showStart">
        <h2>Welcome to the Cognito Forms Quiz!</h2>
        <h3>Things to remember:</h3>
        <p>* Once you move on from a question you cannot revisit it</p>
        <p>
          * You must answer the current question before moving on to the next
          one
        </p>
        <p>Click "Start Quiz" to begin.</p>
      </div>
      <div v-if="showSum">
        <p v-for="(ans, index) in userAnswers" v-bind:key="index">{{ ans }}</p>
      </div>
      <button class="raleway" v-if="showStart" @click="stopStartSeen">
        Start Quiz
      </button>
      <div v-if="showQuestion">
        <h3>
          Question
          <!--this should be the index of the question in the array-->
          {{ questCount + 1 }}
          : Please choose the best answer:
        </h3>

        <h3>{{ currentQuestion.text }}</h3>
        <!--must change to check if the count is the same-->
        <Question :question="question" />
        <button
          class="raleway"
          v-for="(answers, index) in currentQuestion.answers"
          v-bind:key="index"
          @click="saveAnswers(currentQuestion.text, answers)"
        >
          {{ answers }}
        </button>
      </div>

      <!-- <p>{{ submitSeen }}</p> -->

      <!--hide until last question/count=last index of questions array-->
    </div>

    <button class="buttonStyle" @click="count" v-if="showNext">
      Next Question
    </button>
    <button @click="showingSummary" class="buttonStyle" v-if="isLastQuestion()">
      Submit Quiz
    </button>
    <button @click="retakeQuiz" class="buttonStyle" v-if="showSum">
      Retake
    </button>
  </div>
</template>

<script>
import Question from "./components/Question.vue";

export default {
  name: "App",
  components: {
    Question,
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showStart: true,
      showQuestion: false,
      showNext: false,
      showSum: false,
      //isQuiz: true,
      userAnswers: [],
      //startSeen: true,
      questCount: 0,
      submitSeen: false,
      //showSummary: false,
    };
  },
  methods: {
    count: function () {
      this.questCount++;
    },
    stopStartSeen: function () {
      this.showStart = false;
      this.showQuestion = true;
      this.showNext = true;
    },
    saveAnswers: function (question, answers) {
      this.userAnswers.push(question, answers);
    },
    isLastQuestion: function () {
      if (this.questCount === this.questions.length - 1) {
        this.showNext = false;
        this.submitSeen = true;
        return true;
      } else {
        return false;
      }
    },
    showingSummary: function () {
      this.showSum = true;
      this.showQuestion = false;
      this.showNext = false;
      this.submitSeen = false;
      //this.isLastQuestion = false;
    },
    retakeQuiz: function () {
      this.showStart = true;
      this.showQuestion = false;
      this.showNext = false;
      this.showSum = false;
      this.userAnswers = [];
      this.questCount = 0;
      this.submitSeen = false;
    },
  },
  computed: {
    currentQuestion: function () {
      return this.questions[this.questCount];
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