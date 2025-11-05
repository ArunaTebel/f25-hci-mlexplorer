// Mock data for courses, quizzes, and content

export const courses = [
  {
    id: 'ml-basics',
    title: 'Machine Learning Basics',
    description: 'Learn the fundamentals of machine learning, including supervised and unsupervised learning, model evaluation, and practical applications.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    instructor: 'Dr. Sarah Johnson',
    duration: '8 weeks',
    level: 'Beginner',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Machine Learning',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'What is Machine Learning?',
            content: {
              type: 'documentation',
              text: `
# What is Machine Learning?

Machine Learning (ML) is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. Instead of following pre-programmed instructions, ML algorithms build mathematical models based on training data to make predictions or decisions.

## Key Concepts

### Types of Machine Learning

1. **Supervised Learning**: The algorithm learns from labeled training data
   - Classification: Predicting categories (e.g., spam/not spam)
   - Regression: Predicting continuous values (e.g., house prices)

2. **Unsupervised Learning**: The algorithm finds patterns in unlabeled data
   - Clustering: Grouping similar data points
   - Dimensionality Reduction: Reducing the number of features

3. **Reinforcement Learning**: The algorithm learns through trial and error with rewards

### Why Machine Learning Matters

Machine learning powers many modern applications:
- Recommendation systems (Netflix, Amazon)
- Image recognition (medical diagnosis, autonomous vehicles)
- Natural language processing (chatbots, translation)
- Fraud detection in banking
- Personalized marketing

## Real-World Example

Consider an email spam filter. Instead of manually writing rules like "if email contains 'free money', mark as spam," a machine learning model:
1. Analyzes thousands of emails (training data)
2. Learns patterns that distinguish spam from legitimate emails
3. Automatically improves as it sees more examples
              `,
            },
          },
          {
            id: 'lesson-1-2',
            title: 'The Machine Learning Workflow',
            content: {
              type: 'documentation',
              text: `
# The Machine Learning Workflow

A typical machine learning project follows these steps:

## 1. Problem Definition
- Define the business problem
- Determine success metrics
- Identify available data

## 2. Data Collection
- Gather relevant datasets
- Ensure data quality
- Handle missing values

## 3. Data Preprocessing
- Clean the data
- Feature engineering
- Data normalization

## 4. Model Selection
- Choose appropriate algorithm
- Consider problem type (classification, regression, etc.)
- Evaluate model complexity

## 5. Training
- Split data into training and validation sets
- Train the model on training data
- Tune hyperparameters

## 6. Evaluation
- Test on unseen data
- Measure performance metrics
- Compare with baseline

## 7. Deployment
- Deploy model to production
- Monitor performance
- Retrain as needed
              `,
            },
          },
        ],
      },
      {
        id: 'module-2',
        title: 'Supervised Learning',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Linear Regression',
            content: {
              type: 'mixed',
              documentation: `
# Linear Regression

Linear regression is one of the simplest and most widely used machine learning algorithms. It models the relationship between a dependent variable and one or more independent variables using a linear equation.

## The Linear Equation

\`\`\`
y = mx + b
\`\`\`

Where:
- y is the predicted value
- m is the slope
- x is the input feature
- b is the y-intercept

## Cost Function

The goal is to minimize the Mean Squared Error (MSE):

\`\`\`
MSE = (1/n) Σ(y_predicted - y_actual)²
\`\`\`
              `,
              code: `
# Python implementation of Linear Regression
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create and train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")
print(f"Model coefficients: {model.coef_}")
print(f"Model intercept: {model.intercept_}")
              `,
            },
          },
          {
            id: 'lesson-2-2',
            title: 'Classification Algorithms',
            content: {
              type: 'mixed',
              documentation: `
# Classification Algorithms

Classification is a supervised learning task where the goal is to predict categorical labels.

## Common Algorithms

### 1. Logistic Regression
- Uses sigmoid function to output probabilities
- Good for binary classification
- Interpretable and fast

### 2. Decision Trees
- Tree-like model of decisions
- Easy to understand and visualize
- Can handle non-linear relationships

### 3. Random Forest
- Ensemble of decision trees
- Reduces overfitting
- High accuracy

### 4. Support Vector Machines (SVM)
- Finds optimal boundary between classes
- Effective in high-dimensional spaces
- Good for complex datasets
              `,
              code: `
# Classification example with Random Forest
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Create and train model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Make predictions
y_pred = clf.predict(X_test)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
print(classification_report(y_test, y_pred))
              `,
            },
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'quiz-1',
        title: 'ML Basics Quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is the main difference between supervised and unsupervised learning?',
            type: 'multiple_choice',
            options: [
              'Supervised learning uses labeled data, unsupervised uses unlabeled data',
              'Supervised learning is faster than unsupervised learning',
              'Unsupervised learning always produces better results',
              'There is no difference between them',
            ],
            correctAnswer: 0,
          },
          {
            id: 'q2',
            question: 'Which of the following is an example of classification?',
            type: 'multiple_choice',
            options: [
              'Predicting house prices',
              'Grouping customers by behavior',
              'Identifying spam emails',
              'Reducing image dimensions',
            ],
            correctAnswer: 2,
          },
          {
            id: 'q3',
            question: 'Machine learning models improve automatically with more data.',
            type: 'true_false',
            correctAnswer: true,
          },
        ],
      },
    ],
    labs: [
      {
        id: 'lab-1',
        title: 'Your First ML Model',
        description: 'Build a simple linear regression model to predict house prices.',
      },
    ],
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Fundamentals',
    description: 'Dive deep into neural networks, convolutional neural networks, and recurrent neural networks for advanced AI applications.',
    thumbnail: 'https://images.unsplash.com/photo-1495592822108-9e6261896da8?q=80&w=800',
    instructor: 'Prof. Michael Chen',
    duration: '10 weeks',
    level: 'Intermediate',
    modules: [
      {
        id: 'module-1',
        title: 'Neural Networks Basics',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Introduction to Neural Networks',
            content: {
              type: 'documentation',
              text: `
# Introduction to Neural Networks

Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) organized in layers.

## Architecture

A typical neural network has:
- **Input Layer**: Receives the input data
- **Hidden Layers**: Process the data through weighted connections
- **Output Layer**: Produces the final prediction

## Activation Functions

Activation functions introduce non-linearity:
- **Sigmoid**: Outputs values between 0 and 1
- **ReLU**: Most common, outputs max(0, x)
- **Tanh**: Outputs values between -1 and 1

## Forward Propagation

Data flows forward through the network:
1. Input is multiplied by weights
2. Bias is added
3. Activation function is applied
4. Process repeats for each layer
              `,
            },
          },
          {
            id: 'lesson-1-2',
            title: 'Backpropagation',
            content: {
              type: 'documentation',
              text: `
# Backpropagation

Backpropagation is the algorithm used to train neural networks by calculating gradients and updating weights.

## How It Works

1. Forward pass: Calculate predictions
2. Calculate loss: Compare predictions with actual values
3. Backward pass: Calculate gradients
4. Update weights: Adjust weights to minimize loss

## Gradient Descent

The optimization algorithm that minimizes the loss function by iteratively moving in the direction of steepest descent.
              `,
            },
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'quiz-1',
        title: 'Neural Networks Quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is the purpose of activation functions in neural networks?',
            type: 'multiple_choice',
            options: [
              'To increase computation speed',
              'To introduce non-linearity',
              'To reduce memory usage',
              'To simplify the network',
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
    labs: [
      {
        id: 'lab-1',
        title: 'Building Your First Neural Network',
        description: 'Create a simple neural network using TensorFlow/Keras.',
      },
    ],
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Master text processing, sentiment analysis, language models, and transformer architectures.',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    instructor: 'Dr. Emily Rodriguez',
    duration: '12 weeks',
    level: 'Advanced',
    modules: [
      {
        id: 'module-1',
        title: 'Text Preprocessing',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Tokenization and Text Cleaning',
            content: {
              type: 'documentation',
              text: `
# Tokenization and Text Cleaning

Natural Language Processing begins with preprocessing text data to make it suitable for machine learning models.

## Tokenization

Breaking text into smaller units (tokens):
- Word tokenization: "Hello world" → ["Hello", "world"]
- Sentence tokenization: Splitting into sentences
- Character tokenization: Breaking into characters

## Text Cleaning Steps

1. **Lowercasing**: Convert all text to lowercase
2. **Removing punctuation**: Clean special characters
3. **Removing stop words**: Remove common words (the, a, an, etc.)
4. **Stemming/Lemmatization**: Reduce words to root form
5. **Handling numbers**: Convert or remove numeric values
              `,
            },
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'quiz-1',
        title: 'NLP Basics Quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is tokenization?',
            type: 'multiple_choice',
            options: [
              'Converting text to numbers',
              'Breaking text into smaller units',
              'Removing punctuation',
              'Translating text',
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
    labs: [
      {
        id: 'lab-1',
        title: 'Sentiment Analysis Project',
        description: 'Build a sentiment analysis model to classify text as positive or negative.',
      },
    ],
  },
];

// Helper function to get course by ID
export const getCourseById = (courseId) => {
  return courses.find(course => course.id === courseId);
};

// Helper function to get lesson by IDs
export const getLesson = (courseId, moduleId, lessonId) => {
  const course = getCourseById(courseId);
  if (!course) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module) return null;
  
  return module.lessons.find(l => l.id === lessonId) || null;
};

// Helper function to get quiz by IDs
export const getQuiz = (courseId, quizId) => {
  const course = getCourseById(courseId);
  if (!course) return null;
  
  return course.quizzes.find(q => q.id === quizId) || null;
};

