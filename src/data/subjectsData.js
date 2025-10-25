// Complete Subject Data for Grades 1-5
// Each subject contains grade-specific lessons and quizzes

export const SUBJECTS_DATA = {
  english: {
    id: 'english',
    name: 'English',
    icon: 'book',
    color: '#FF6B6B',
    description: 'Learn letters, words, and stories',
    grades: {
      1: {
        lessons: [
          {
            id: 1,
            title: 'Alphabets A-Z 🔤',
            content: 'The alphabet has 26 letters! A, B, C, D... Let\'s learn them all with fun pictures and sounds!',
            description: 'Learn all 26 letters with pictures',
            image: '📚',
            audio: 'alphabets.mp3',
            duration: '8 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 2,
            title: 'Vowels - A E I O U 🎵',
            content: 'Vowels are special letters: A, E, I, O, U. They make sounds in every word!',
            description: 'Learn about vowels and their sounds',
            image: '🎤',
            audio: 'vowels.mp3',
            duration: '6 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 3,
            title: 'Rhyming Words 🎶',
            content: 'Words that sound the same are rhyming words! Cat-Hat, Dog-Log, Sun-Fun!',
            description: 'Learn words that rhyme together',
            image: '🎵',
            audio: 'rhyming.mp3',
            duration: '10 min',
            difficulty: 'Beginner',
            points: 15
          },
          {
            id: 4,
            title: 'Simple Words 📖',
            content: 'Let\'s make simple words! C-A-T makes Cat! D-O-G makes Dog!',
            description: 'Learn to read simple 3-letter words',
            image: '✏️',
            audio: 'simple_words.mp3',
            duration: '12 min',
            difficulty: 'Intermediate',
            points: 15
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Alphabet Quiz 🔤',
            description: 'Test your ABC knowledge!',
            duration: '5 min',
            difficulty: 'Easy',
            questions: [
              {
                question: 'Which letter comes after A?',
                options: ['C', 'B', 'D', 'E'],
                correct: 1,
                emoji: '🔤'
              },
              {
                question: 'Which is a vowel?',
                options: ['B', 'C', 'A', 'D'],
                correct: 2,
                emoji: '🎤'
              },
              {
                question: 'Which word rhymes with CAT?',
                options: ['Dog', 'Hat', 'Sun', 'Car'],
                correct: 1,
                emoji: '🎵'
              },
              {
                question: 'What letter does APPLE start with?',
                options: ['B', 'A', 'C', 'D'],
                correct: 1,
                emoji: '🍎'
              },
              {
                question: 'How many vowels are there?',
                options: ['3', '4', '5', '6'],
                correct: 2,
                emoji: '🔢'
              }
            ],
            points: 20
          }
        ]
      },
      2: {
        lessons: [
          {
            id: 1,
            title: 'Grammar Basics 📝',
            content: 'A sentence starts with a capital letter and ends with a full stop!',
            description: 'Learn basic grammar rules',
            image: '✍️',
            duration: '10 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 2,
            title: 'Nouns - Names of Things 🏠',
            content: 'A noun is a naming word. Boy, Girl, Cat, Table are all nouns!',
            description: 'Learn about naming words',
            image: '🏷️',
            duration: '12 min',
            difficulty: 'Intermediate',
            points: 15
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Grammar Quiz',
            description: 'Test your grammar skills',
            duration: '8 min',
            difficulty: 'Medium',
            questions: [
              {
                question: 'Which is a noun?',
                options: ['Run', 'Table', 'Happy', 'Quickly'],
                correct: 1,
                emoji: '🏷️'
              },
              {
                question: 'A sentence ends with?',
                options: ['Comma', 'Full Stop', 'Question', 'Space'],
                correct: 1,
                emoji: '📝'
              }
            ],
            points: 25
          }
        ]
      }
    }
  },
  
  maths: {
    id: 'maths',
    name: 'Mathematics',
    icon: 'calculator',
    color: '#4ECDC4',
    description: 'Learn numbers, shapes, and counting',
    grades: {
      1: {
        lessons: [
          {
            id: 1,
            title: 'Numbers 1-10 🔢',
            content: 'Let\'s count together! 1, 2, 3, 4, 5, 6, 7, 8, 9, 10! Numbers help us count things around us. One banana 🍌, two apples 🍎🍎, three balls ⚽⚽⚽! Counting is fun and helps us everywhere!',
            description: 'Learn to count from 1 to 10',
            image: '🔢',
            audio: 'numbers.mp3',
            duration: '10 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 2,
            title: 'Addition - Adding Numbers ➕',
            content: 'When we add, we put things together! If you have 1 apple 🍎 and get 1 more apple 🍎, how many do you have? 1 + 1 = 2! Adding makes things MORE! 2 + 3 = 5. Try counting on your fingers!',
            description: 'Learn to add numbers',
            image: '➕',
            audio: 'addition.mp3',
            duration: '15 min',
            difficulty: 'Beginner',
            points: 15
          },
          {
            id: 3,
            title: 'Shapes Around Us 🔵',
            content: 'Shapes are everywhere! Circle ⭕ like a pizza, Square ⬜ like a window, Triangle 🔺 like a slice of pizza! A circle has no corners, a square has 4 corners, and a triangle has 3 corners. Look around - can you find shapes?',
            description: 'Learn about basic shapes',
            image: '🔷',
            audio: 'shapes.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 4,
            title: 'Subtraction - Taking Away ➖',
            content: 'When we subtract, we take things away! You have 5 candies 🍬🍬🍬🍬🍬 and eat 2. How many left? 5 - 2 = 3! Subtraction makes things LESS. If you have 4 balloons and 1 flies away, you have 4 - 1 = 3 left!',
            description: 'Learn to subtract numbers',
            image: '➖',
            audio: 'subtraction.mp3',
            duration: '15 min',
            difficulty: 'Intermediate',
            points: 15
          },
          {
            id: 5,
            title: 'Comparing Numbers - Big & Small 🔎',
            content: 'Which is bigger: 5 or 3? 5 is bigger! We use > (greater than) and < (less than). 7 > 4 means 7 is bigger. 2 < 6 means 2 is smaller. The hungry alligator 🐊 always eats the bigger number!',
            description: 'Learn to compare numbers',
            image: '🔎',
            audio: 'comparing.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 6,
            title: 'Money - Coins & Notes 💰',
            content: 'Money helps us buy things! ₹1, ₹2, ₹5, ₹10 coins. If you have two ₹5 coins, you have ₹10! Count your coins: 1 + 1 + 1 = 3 coins. Money math is important!',
            description: 'Introduction to money and counting coins',
            image: '💰',
            audio: 'money.mp3',
            duration: '14 min',
            difficulty: 'Intermediate',
            points: 14
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Numbers & Counting Quiz 🔢',
            description: 'Let\'s test your counting!',
            duration: '8 min',
            difficulty: 'Easy',
            questions: [
              {
                question: 'What is 2 + 2?',
                options: ['3', '4', '5', '6'],
                correct: 1,
                emoji: '➕'
              },
              {
                question: 'How many sides does a triangle have?',
                options: ['2', '3', '4', '5'],
                correct: 1,
                emoji: '🔺'
              },
              {
                question: 'What is 5 - 2?',
                options: ['2', '3', '4', '5'],
                correct: 1,
                emoji: '➖'
              },
              {
                question: 'Which is a circle?',
                options: ['⬜', '🔺', '⭕', '⬛'],
                correct: 2,
                emoji: '⭕'
              },
              {
                question: 'Count the stars: ⭐⭐⭐',
                options: ['2', '3', '4', '5'],
                correct: 1,
                emoji: '⭐'
              },
              {
                question: 'Which number is bigger: 7 or 4?',
                options: ['7', '4', 'Same', 'None'],
                correct: 0,
                emoji: '🔎'
              },
              {
                question: 'What is 1 + 3?',
                options: ['3', '4', '5', '2'],
                correct: 1,
                emoji: '➕'
              },
              {
                question: 'How many corners in a square?',
                options: ['2', '3', '4', '5'],
                correct: 2,
                emoji: '⬜'
              }
            ],
            points: 25
          },
          {
            id: 2,
            title: 'Shapes & Money Quiz 💰',
            description: 'Test your shape and money knowledge!',
            duration: '6 min',
            difficulty: 'Easy',
            questions: [
              {
                question: 'A pizza is which shape?',
                options: ['Square', 'Circle', 'Triangle', 'Rectangle'],
                correct: 1,
                emoji: '🍕'
              },
              {
                question: 'If you have ₹5 and ₹5, total is?',
                options: ['₹5', '₹10', '₹15', '₹20'],
                correct: 1,
                emoji: '💰'
              },
              {
                question: 'What is 6 - 3?',
                options: ['2', '3', '4', '5'],
                correct: 1,
                emoji: '➖'
              },
              {
                question: 'Which is smallest: 2, 5, 8, 1?',
                options: ['2', '5', '8', '1'],
                correct: 3,
                emoji: '🔢'
              },
              {
                question: 'How many sides in a triangle?',
                options: ['2', '3', '4', '5'],
                correct: 1,
                emoji: '🔺'
              }
            ],
            points: 20
          }
        ]
      },
      2: {
        lessons: [
          {
            id: 1,
            title: 'Numbers 11-100 💯',
            content: 'Now we count bigger! 11, 12, 13... 20, 30, 40, 50, 60, 70, 80, 90, 100! After 10 comes 11 (ten-one), 12 (ten-two). Twenty means 2 tens! Hundred is a BIG number - 100!',
            description: 'Learn to count up to 100',
            image: '💯',
            duration: '15 min',
            difficulty: 'Beginner',
            points: 15
          },
          {
            id: 2,
            title: 'Multiplication Basics ✖️',
            content: 'Multiplication is fast addition! Instead of 3 + 3 + 3 + 3, we say 4 × 3 = 12! It means "4 groups of 3". 2 × 5 means 5 + 5 = 10. The multiplication table is your friend!',
            description: 'Introduction to multiplication',
            image: '✖️',
            audio: 'multiplication.mp3',
            duration: '18 min',
            difficulty: 'Intermediate',
            points: 18
          },
          {
            id: 3,
            title: 'Division - Sharing Equally ➗',
            content: 'Division means sharing equally! If you have 6 chocolates 🍫 and share with 2 friends, each gets 3! 6 ÷ 2 = 3. Division is the opposite of multiplication. 12 ÷ 3 = 4 means "12 divided into 3 groups gives 4 in each group".',
            description: 'Learn basic division',
            image: '➗',
            audio: 'division.mp3',
            duration: '18 min',
            difficulty: 'Intermediate',
            points: 18
          },
          {
            id: 4,
            title: 'Even & Odd Numbers 🎲',
            content: 'Numbers can be Even or Odd! Even numbers: 2, 4, 6, 8, 10 (can be split into 2 equal groups). Odd numbers: 1, 3, 5, 7, 9 (have 1 left over). If a number ends in 0, 2, 4, 6, 8 - it\'s EVEN!',
            description: 'Understand even and odd numbers',
            image: '🎲',
            audio: 'even_odd.mp3',
            duration: '14 min',
            difficulty: 'Beginner',
            points: 14
          },
          {
            id: 5,
            title: 'Measurement - Length & Weight ⚖️',
            content: 'We measure things! Length: centimeter (cm), meter (m). Weight: gram (g), kilogram (kg). A pencil ✏️ is about 15 cm long. You might weigh 25 kg! A ruler helps measure length. A scale measures weight!',
            description: 'Learn basic measurement units',
            image: '⚖️',
            audio: 'measurement.mp3',
            duration: '16 min',
            difficulty: 'Intermediate',
            points: 16
          },
          {
            id: 6,
            title: 'Time - Hours & Minutes ⏰',
            content: 'Time tells us when! 60 minutes = 1 hour. 24 hours = 1 day. The short hand shows hours ⌚, long hand shows minutes. 3:00 means 3 o\'clock. Half past 3 is 3:30. Time is important!',
            description: 'Learn to tell time',
            image: '⏰',
            audio: 'time.mp3',
            duration: '16 min',
            difficulty: 'Intermediate',
            points: 16
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Multiplication & Division Quiz ✖️➗',
            description: 'Test your multiplication and division!',
            duration: '10 min',
            difficulty: 'Medium',
            questions: [
              {
                question: 'What is 3 × 4?',
                options: ['10', '12', '14', '16'],
                correct: 1,
                emoji: '✖️'
              },
              {
                question: 'What is 10 ÷ 2?',
                options: ['3', '4', '5', '6'],
                correct: 2,
                emoji: '➗'
              },
              {
                question: 'Is 7 even or odd?',
                options: ['Even', 'Odd', 'Both', 'Neither'],
                correct: 1,
                emoji: '🎲'
              },
              {
                question: 'What is 5 × 2?',
                options: ['8', '10', '12', '15'],
                correct: 1,
                emoji: '✖️'
              },
              {
                question: 'What is 15 ÷ 3?',
                options: ['3', '4', '5', '6'],
                correct: 2,
                emoji: '➗'
              },
              {
                question: 'Which number is even?',
                options: ['11', '13', '14', '15'],
                correct: 2,
                emoji: '🎲'
              },
              {
                question: 'How many minutes in 1 hour?',
                options: ['30', '60', '90', '120'],
                correct: 1,
                emoji: '⏰'
              }
            ],
            points: 28
          },
          {
            id: 2,
            title: 'Numbers & Measurement Quiz 📏',
            description: 'Challenge your knowledge!',
            duration: '8 min',
            difficulty: 'Medium',
            questions: [
              {
                question: 'What comes after 49?',
                options: ['48', '50', '51', '60'],
                correct: 1,
                emoji: '💯'
              },
              {
                question: '100 cm equals how many meters?',
                options: ['0.1 m', '1 m', '10 m', '100 m'],
                correct: 1,
                emoji: '📏'
              },
              {
                question: 'What is 4 × 3?',
                options: ['10', '11', '12', '13'],
                correct: 2,
                emoji: '✖️'
              },
              {
                question: '1000 grams equals?',
                options: ['1 kg', '10 kg', '100 kg', '1000 kg'],
                correct: 0,
                emoji: '⚖️'
              },
              {
                question: 'What is 20 ÷ 4?',
                options: ['4', '5', '6', '7'],
                correct: 1,
                emoji: '➗'
              }
            ],
            points: 25
          }
        ]
      },
      3: {
        lessons: [
          {
            id: 1,
            title: 'Multiplication Tables 2-10 📊',
            content: 'Learn your tables! 2×1=2, 2×2=4, 2×3=6... up to 2×10=20. Then 3 table, 4 table, all the way to 10! Tables make math super fast. Practice daily and you\'ll remember forever!',
            description: 'Master multiplication tables',
            image: '📊',
            audio: 'tables.mp3',
            duration: '20 min',
            difficulty: 'Intermediate',
            points: 20
          },
          {
            id: 2,
            title: 'Fractions - Half, Quarter 🍕',
            content: 'A fraction is a part of a whole! 1/2 is half (one pizza cut in 2, you get 1 piece). 1/4 is quarter (pizza cut in 4 pieces). 1/3 means 1 out of 3 parts. Numerator is top number, denominator is bottom!',
            description: 'Introduction to fractions',
            image: '🍕',
            audio: 'fractions.mp3',
            duration: '18 min',
            difficulty: 'Intermediate',
            points: 18
          },
          {
            id: 3,
            title: 'Place Value - Ones, Tens, Hundreds 🔢',
            content: 'Every digit has a place! In 345: 5 is in ones place (5), 4 is in tens place (40), 3 is in hundreds place (300). So 345 = 300 + 40 + 5! Understanding place value helps with big numbers!',
            description: 'Learn place value system',
            image: '🔢',
            audio: 'place_value.mp3',
            duration: '16 min',
            difficulty: 'Intermediate',
            points: 16
          },
          {
            id: 4,
            title: 'Geometry - Angles & Lines 📐',
            content: 'Lines can be straight —, curved ~, or zigzag \/\/. Angles are where two lines meet! Right angle is 90° like corner of book 📖. Acute is less than 90°, obtuse is more than 90°. Geometry is all around us!',
            description: 'Basic geometry concepts',
            image: '📐',
            audio: 'geometry.mp3',
            duration: '17 min',
            difficulty: 'Intermediate',
            points: 17
          },
          {
            id: 5,
            title: 'Word Problems - Story Math 📖',
            content: 'Math in stories! "Ram has 12 apples, gives 5 to Sita. How many left?" Read carefully, find the operation (12 - 5 = 7). Look for keywords: "total" means add, "left" means subtract, "each" means multiply!',
            description: 'Solve word problems',
            image: '📖',
            audio: 'word_problems.mp3',
            duration: '19 min',
            difficulty: 'Advanced',
            points: 19
          },
          {
            id: 6,
            title: 'Patterns & Sequences 🔄',
            content: 'Patterns repeat! 2, 4, 6, 8... (add 2 each time). 🔴🔵🔴🔵... (color pattern). Find the rule! In 5, 10, 15, 20, the rule is +5. Patterns help predict what comes next!',
            description: 'Recognize and create patterns',
            image: '🔄',
            audio: 'patterns.mp3',
            duration: '15 min',
            difficulty: 'Intermediate',
            points: 15
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Tables & Fractions Quiz 📊',
            description: 'Master your tables and fractions!',
            duration: '12 min',
            difficulty: 'Medium',
            questions: [
              {
                question: 'What is 7 × 8?',
                options: ['54', '56', '58', '60'],
                correct: 1,
                emoji: '✖️'
              },
              {
                question: 'What is 1/2 of 10?',
                options: ['3', '4', '5', '6'],
                correct: 2,
                emoji: '🍕'
              },
              {
                question: 'In 567, what is in tens place?',
                options: ['5', '6', '7', '0'],
                correct: 1,
                emoji: '🔢'
              },
              {
                question: 'What is 9 × 6?',
                options: ['52', '54', '56', '58'],
                correct: 1,
                emoji: '📊'
              },
              {
                question: 'Which fraction is largest: 1/2 or 1/4?',
                options: ['1/2', '1/4', 'Same', 'Can\'t tell'],
                correct: 0,
                emoji: '🍕'
              },
              {
                question: 'What comes next: 3, 6, 9, 12, __?',
                options: ['13', '14', '15', '16'],
                correct: 2,
                emoji: '🔄'
              },
              {
                question: 'A right angle is ____ degrees',
                options: ['45°', '60°', '90°', '180°'],
                correct: 2,
                emoji: '📐'
              },
              {
                question: 'What is 8 × 7?',
                options: ['54', '56', '58', '60'],
                correct: 1,
                emoji: '✖️'
              }
            ],
            points: 32
          }
        ]
      },
      4: {
        lessons: [
          {
            id: 1,
            title: 'Large Numbers - Thousands 🔟',
            content: 'After hundreds comes THOUSANDS! 1,000 has 4 digits. 1,234 = 1 thousand + 2 hundreds + 3 tens + 4 ones. Ten thousand (10,000) is even bigger! Commas help us read: 12,345 is twelve thousand three hundred forty-five!',
            description: 'Work with large numbers',
            image: '🔟',
            audio: 'thousands.mp3',
            duration: '18 min',
            difficulty: 'Intermediate',
            points: 18
          },
          {
            id: 2,
            title: 'Long Multiplication 🧮',
            content: 'Multiply bigger numbers! 23 × 4: First 3 × 4 = 12 (write 2, carry 1). Then 2 × 4 = 8, plus carried 1 = 9. Answer: 92! With practice, you can multiply any numbers. Always start from the right!',
            description: 'Learn long multiplication method',
            image: '🧮',
            audio: 'long_mult.mp3',
            duration: '20 min',
            difficulty: 'Advanced',
            points: 20
          },
          {
            id: 3,
            title: 'Long Division 📝',
            content: 'Division with big numbers! 48 ÷ 4: How many 4s in 4? One! How many 4s in 8? Two! Answer: 12. Long division has steps: Divide, Multiply, Subtract, Bring down. Practice makes perfect!',
            description: 'Master long division',
            image: '📝',
            audio: 'long_div.mp3',
            duration: '22 min',
            difficulty: 'Advanced',
            points: 22
          },
          {
            id: 4,
            title: 'Decimals - Tenths & Hundredths 🎯',
            content: 'Decimals are fractions in a different form! 0.5 = 5/10 = half. 0.25 = 25/100 = quarter. The dot is "decimal point". 3.75 means 3 and 75/100. Money uses decimals: ₹25.50 means 25 rupees and 50 paise!',
            description: 'Introduction to decimals',
            image: '🎯',
            audio: 'decimals.mp3',
            duration: '19 min',
            difficulty: 'Advanced',
            points: 19
          },
          {
            id: 5,
            title: 'Perimeter & Area 📏',
            content: 'Perimeter is the distance AROUND a shape. For a rectangle: add all 4 sides! Area is the space INSIDE. Rectangle area = length × width. If a garden is 5m × 3m, area is 15 square meters!',
            description: 'Calculate perimeter and area',
            image: '📏',
            audio: 'perimeter_area.mp3',
            duration: '20 min',
            difficulty: 'Advanced',
            points: 20
          },
          {
            id: 6,
            title: 'Data Handling - Charts & Graphs 📊',
            content: 'Data is information! We show data in charts and graphs. Bar graph uses bars 📊, pie chart uses circles 🥧. Pictograph uses pictures 🖼️. Tables organize data in rows and columns. Graphs make data easy to understand!',
            description: 'Read and create simple graphs',
            image: '📊',
            audio: 'data.mp3',
            duration: '18 min',
            difficulty: 'Intermediate',
            points: 18
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Advanced Math Quiz 🎓',
            description: 'Challenge yourself with harder problems!',
            duration: '15 min',
            difficulty: 'Hard',
            questions: [
              {
                question: 'What is 45 × 3?',
                options: ['125', '135', '145', '155'],
                correct: 1,
                emoji: '🧮'
              },
              {
                question: 'What is 0.5 + 0.25?',
                options: ['0.50', '0.75', '1.00', '1.25'],
                correct: 1,
                emoji: '🎯'
              },
              {
                question: 'Rectangle 6m × 4m has area of?',
                options: ['10 sq m', '20 sq m', '24 sq m', '30 sq m'],
                correct: 2,
                emoji: '📏'
              },
              {
                question: 'What is 72 ÷ 8?',
                options: ['7', '8', '9', '10'],
                correct: 2,
                emoji: '📝'
              },
              {
                question: '3,456 has how many thousands?',
                options: ['1', '2', '3', '4'],
                correct: 2,
                emoji: '🔟'
              },
              {
                question: 'Perimeter of square with side 5cm?',
                options: ['15 cm', '20 cm', '25 cm', '30 cm'],
                correct: 1,
                emoji: '📏'
              },
              {
                question: 'What is 25 × 4?',
                options: ['90', '95', '100', '105'],
                correct: 2,
                emoji: '🧮'
              },
              {
                question: '0.1 is same as which fraction?',
                options: ['1/5', '1/10', '1/100', '1/2'],
                correct: 1,
                emoji: '🎯'
              }
            ],
            points: 35
          }
        ]
      },
      5: {
        lessons: [
          {
            id: 1,
            title: 'Roman Numerals Ⅰ Ⅱ Ⅲ',
            content: 'Ancient number system! I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Rules: Add if smaller before larger (IV=4, IX=9). We still use them on clocks and in books! XII = 10+2=12. Practice reading them!',
            description: 'Learn Roman numerals',
            image: 'Ⅹ',
            audio: 'roman.mp3',
            duration: '16 min',
            difficulty: 'Intermediate',
            points: 16
          },
          {
            id: 2,
            title: 'Factors & Multiples 🔢',
            content: 'Factors divide a number exactly! Factors of 12: 1, 2, 3, 4, 6, 12. Multiples are multiplication results! Multiples of 3: 3, 6, 9, 12, 15... Prime numbers have only 2 factors (1 and itself): 2, 3, 5, 7, 11...',
            description: 'Understand factors and multiples',
            image: '🔢',
            audio: 'factors.mp3',
            duration: '19 min',
            difficulty: 'Advanced',
            points: 19
          },
          {
            id: 3,
            title: 'Percentage - Out of 100 💯',
            content: 'Percent means "out of 100"! 50% = 50/100 = 1/2 = half. 25% = 1/4 = quarter. To find 10% of 200: (10/100) × 200 = 20. Percentages are used in discounts, scores, and everywhere!',
            description: 'Learn percentage calculations',
            image: '💯',
            audio: 'percentage.mp3',
            duration: '20 min',
            difficulty: 'Advanced',
            points: 20
          },
          {
            id: 4,
            title: 'Average & Mean 📊',
            content: 'Average is the middle value! To find average: Add all numbers, then divide by how many. Average of 2, 4, 6 is (2+4+6)÷3 = 12÷3 = 4. Average shows the "typical" value in data!',
            description: 'Calculate average and mean',
            image: '📊',
            audio: 'average.mp3',
            duration: '17 min',
            difficulty: 'Advanced',
            points: 17
          },
          {
            id: 5,
            title: 'Volume & Capacity 🧊',
            content: 'Volume is the space inside a 3D object! Measured in cubic units. Capacity is how much liquid it holds: milliliters (ml), liters (L). 1 liter = 1000 ml. A cube 2cm × 2cm × 2cm has volume 8 cubic cm!',
            description: 'Understand volume and capacity',
            image: '🧊',
            audio: 'volume.mp3',
            duration: '19 min',
            difficulty: 'Advanced',
            points: 19
          },
          {
            id: 6,
            title: 'Integers - Positive & Negative ➕➖',
            content: 'Numbers can be positive (+) or negative (-)! Positive: 1, 2, 3... Negative: -1, -2, -3... Zero is neither! On number line, negatives go left of zero. Temperature can be -5°C (below freezing)!',
            description: 'Introduction to positive and negative numbers',
            image: '➕➖',
            audio: 'integers.mp3',
            duration: '18 min',
            difficulty: 'Advanced',
            points: 18
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Expert Math Challenge 🏆',
            description: 'For math champions only!',
            duration: '18 min',
            difficulty: 'Hard',
            questions: [
              {
                question: 'What is XV in Roman numerals?',
                options: ['5', '10', '15', '20'],
                correct: 2,
                emoji: 'Ⅹ'
              },
              {
                question: 'What is 50% of 80?',
                options: ['30', '35', '40', '45'],
                correct: 2,
                emoji: '💯'
              },
              {
                question: 'Which is a prime number?',
                options: ['4', '6', '7', '8'],
                correct: 2,
                emoji: '🔢'
              },
              {
                question: 'Average of 10, 20, 30 is?',
                options: ['15', '20', '25', '30'],
                correct: 1,
                emoji: '📊'
              },
              {
                question: 'Volume of cube with side 3cm?',
                options: ['9 cu cm', '18 cu cm', '27 cu cm', '36 cu cm'],
                correct: 2,
                emoji: '🧊'
              },
              {
                question: 'Which is negative: -5 or 3?',
                options: ['-5', '3', 'Both', 'Neither'],
                correct: 0,
                emoji: '➖'
              },
              {
                question: 'First 3 multiples of 4?',
                options: ['2,4,6', '4,8,12', '4,6,8', '1,2,3'],
                correct: 1,
                emoji: '🔢'
              },
              {
                question: 'What is 25% of 100?',
                options: ['20', '25', '30', '50'],
                correct: 1,
                emoji: '💯'
              },
              {
                question: '1000 ml equals?',
                options: ['0.1 L', '1 L', '10 L', '100 L'],
                correct: 1,
                emoji: '🧊'
              },
              {
                question: 'What is XXV in Roman numerals?',
                options: ['15', '20', '25', '30'],
                correct: 2,
                emoji: 'Ⅹ'
              }
            ],
            points: 40
          }
        ]
      }
    }
  },

  science: {
    id: 'science',
    name: 'Science',
    icon: 'flask',
    color: '#95E1D3',
    description: 'Explore plants, animals, and nature',
    grades: {
      1: {
        lessons: [
          {
            id: 1,
            title: 'Plants Around Us 🌱',
            content: 'Plants are living things! They need water 💧, sunlight ☀️, and air to grow. Trees 🌳 are big plants. Flowers 🌸 are colorful! Grass is a small plant. Plants give us food like fruits 🍎 and vegetables 🥕. They also give us oxygen to breathe!',
            description: 'Learn about plants and how they grow',
            image: '🌳',
            audio: 'plants.mp3',
            duration: '10 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 2,
            title: 'Animals - Our Friends 🐶',
            content: 'Animals are living things too! Some have 2 legs 🐦, some have 4 🐕. Fish 🐠 live in water, birds 🐦 can fly, animals like dogs 🐕 and cats 🐱 are pets. Wild animals 🦁 live in forests. Animals eat food, drink water, and breathe air!',
            description: 'Learn about different animals',
            image: '🦁',
            audio: 'animals.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 3,
            title: 'Our Body Parts 👋',
            content: 'Our body is amazing! We have 👀 eyes to see, 👂 ears to hear, 👃 nose to smell, 👅 tongue to taste, and 🤚 hands to touch! These are our 5 senses. Our legs help us walk 🚶, hands help us hold things. Our heart ❤️ pumps blood. Our brain 🧠 helps us think!',
            description: 'Learn about human body parts',
            image: '👤',
            audio: 'body.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 4,
            title: 'Weather & Seasons 🌦️',
            content: 'Weather changes every day! Sometimes it\'s sunny ☀️ and hot, sometimes rainy 🌧️ and wet, sometimes cloudy ☁️. India has 3 main seasons: Summer (hot), Monsoon (rainy), Winter (cold). We wear different clothes for different weather!',
            description: 'Learn about different types of weather',
            image: '🌈',
            audio: 'weather.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 5,
            title: 'Day & Night - Sun & Moon 🌞🌙',
            content: 'During the day, we see the sun ☀️ in the sky. It gives us light and warmth. At night 🌙, the sun goes away and we see the moon and stars ⭐. Day is for playing and working. Night is for sleeping 😴. Earth rotates to make day and night!',
            description: 'Understand day and night cycle',
            image: '🌞',
            audio: 'day_night.mp3',
            duration: '11 min',
            difficulty: 'Beginner',
            points: 11
          },
          {
            id: 6,
            title: 'Water - Very Important! 💧',
            content: 'Water is everywhere! We drink it, bathe in it, cook with it. Rivers 🏞️, lakes, and oceans have water. Rain ☔ comes from clouds. We should not waste water. Turn off the tap 🚰 when not using. Water is life!',
            description: 'Learn about water and its importance',
            image: '💧',
            audio: 'water.mp3',
            duration: '10 min',
            difficulty: 'Beginner',
            points: 10
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Science Explorer Quiz 🔬',
            description: 'Explore the world of science!',
            duration: '8 min',
            difficulty: 'Easy',
            questions: [
              {
                question: 'Which animal can fly?',
                options: ['Dog 🐶', 'Cat 🐱', 'Bird 🐦', 'Fish 🐠'],
                correct: 2,
                emoji: '🐦'
              },
              {
                question: 'What do plants need to grow?',
                options: ['Water 💧', 'Books 📚', 'Toys 🧸', 'TV 📺'],
                correct: 0,
                emoji: '🌱'
              },
              {
                question: 'Which lives in water?',
                options: ['Lion 🦁', 'Fish 🐟', 'Cow 🐄', 'Dog 🐕'],
                correct: 1,
                emoji: '🐟'
              },
              {
                question: 'We use our _____ to see',
                options: ['Ears', 'Eyes', 'Nose', 'Mouth'],
                correct: 1,
                emoji: '👀'
              },
              {
                question: 'When it rains, we use?',
                options: ['Umbrella ☂️', 'Ball ⚽', 'Book 📖', 'Pencil ✏️'],
                correct: 0,
                emoji: '☂️'
              },
              {
                question: 'When do we see the sun?',
                options: ['Night', 'Day', 'Never', 'Always'],
                correct: 1,
                emoji: '🌞'
              },
              {
                question: 'What should we do with water?',
                options: ['Waste it', 'Save it', 'Throw it', 'Burn it'],
                correct: 1,
                emoji: '💧'
              }
            ],
            points: 25
          }
        ]
      },
      2: {
        lessons: [
          {
            id: 1,
            title: 'Parts of a Plant 🌿',
            content: 'Plants have different parts! 🌱 Roots grow under soil and take water. Stem holds the plant up. 🍃 Leaves make food using sunlight. 🌺 Flowers look beautiful and make fruits. Seeds grow into new plants. Each part has a job!',
            description: 'Learn different parts of plants',
            image: '🌿',
            audio: 'plant_parts.mp3',
            duration: '14 min',
            difficulty: 'Beginner',
            points: 14
          },
          {
            id: 2,
            title: 'Animal Homes 🏠',
            content: 'Animals live in different homes! 🐦 Birds live in nests on trees. 🦁 Lions live in dens. 🐝 Bees live in hives. 🐜 Ants live in anthills. 🐠 Fish live in water. Humans live in houses 🏡. Animals build or find their homes!',
            description: 'Discover where animals live',
            image: '🏠',
            audio: 'animal_homes.mp3',
            duration: '13 min',
            difficulty: 'Beginner',
            points: 13
          },
          {
            id: 3,
            title: 'Healthy Food 🥗',
            content: 'Food gives us energy! 🍎 Fruits, 🥕 vegetables, 🥛 milk make us strong. Junk food 🍔 is not good always. Eat breakfast, lunch, and dinner on time. Drink lots of water 💧. Wash hands before eating! Healthy food = Healthy body!',
            description: 'Learn about healthy eating habits',
            image: '🥗',
            audio: 'healthy_food.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 4,
            title: 'Keeping Clean - Hygiene 🧼',
            content: 'Staying clean keeps us healthy! 🛁 Bath daily, brush teeth twice 🪥, wash hands with soap 🧼 before eating and after toilet. Cut nails regularly. Wear clean clothes 👕. Keep your room tidy. Cleanliness prevents diseases!',
            description: 'Importance of cleanliness and hygiene',
            image: '🧼',
            audio: 'hygiene.mp3',
            duration: '11 min',
            difficulty: 'Beginner',
            points: 11
          },
          {
            id: 5,
            title: 'Air Around Us 💨',
            content: 'Air is everywhere but we can\'t see it! We breathe air through our nose 👃. Wind is moving air. Kites 🪁 fly because of wind. Trees 🌳 give us fresh air. Pollution 🏭 makes air dirty. We should plant more trees and keep air clean!',
            description: 'Learn about air and breathing',
            image: '💨',
            audio: 'air.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 6,
            title: 'Magnets - Pull & Push 🧲',
            content: 'Magnets are special! They pull (attract) some things and push (repel) others. Magnets attract iron 🔩, steel, nickel. They don\'t attract plastic, wood, or paper. Magnets have North and South poles. Opposite poles attract, same poles repel!',
            description: 'Introduction to magnets',
            image: '🧲',
            audio: 'magnets.mp3',
            duration: '13 min',
            difficulty: 'Intermediate',
            points: 13
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Living Things Quiz 🌱',
            description: 'Test your knowledge of plants and animals!',
            duration: '10 min',
            difficulty: 'Easy',
            questions: [
              {
                question: 'Which part of plant is underground?',
                options: ['Leaf', 'Root', 'Flower', 'Fruit'],
                correct: 1,
                emoji: '🌱'
              },
              {
                question: 'Where do bees live?',
                options: ['Nest', 'Den', 'Hive', 'House'],
                correct: 2,
                emoji: '🐝'
              },
              {
                question: 'Which is healthy food?',
                options: ['Chips', 'Apple 🍎', 'Candy', 'Cola'],
                correct: 1,
                emoji: '🥗'
              },
              {
                question: 'What should we do before eating?',
                options: ['Sleep', 'Wash hands', 'Play', 'Watch TV'],
                correct: 1,
                emoji: '🧼'
              },
              {
                question: 'What do we breathe?',
                options: ['Water', 'Air', 'Food', 'Soil'],
                correct: 1,
                emoji: '💨'
              },
              {
                question: 'Magnets attract which metal?',
                options: ['Wood', 'Plastic', 'Iron', 'Paper'],
                correct: 2,
                emoji: '🧲'
              }
            ],
            points: 24
          }
        ]
      },
      3: {
        lessons: [
          {
            id: 1,
            title: 'Life Cycle of Plants 🌱➡️🌳',
            content: 'Plants grow in stages! Seed 🌰 → Sapling 🌱 → Plant 🌿 → Tree 🌳. Seeds need soil, water, and sunlight to grow. First, a tiny shoot comes out. Then leaves appear. After some time, it becomes a big plant. Some plants give flowers 🌸 and fruits 🍎!',
            description: 'Understand how plants grow',
            image: '🌱',
            audio: 'plant_lifecycle.mp3',
            duration: '15 min',
            difficulty: 'Intermediate',
            points: 15
          },
          {
            id: 2,
            title: 'Life Cycle of Animals 🥚➡️🐥',
            content: 'Animals also grow in stages! Chicken: Egg 🥚 → Chick 🐥 → Hen 🐔. Butterfly: Egg → Caterpillar 🐛 → Cocoon → Butterfly 🦋. Frog: Egg → Tadpole → Froglet → Frog 🐸. This is called metamorphosis! Amazing changes!',
            description: 'Learn animal life cycles',
            image: '🦋',
            audio: 'animal_lifecycle.mp3',
            duration: '16 min',
            difficulty: 'Intermediate',
            points: 16
          },
          {
            id: 3,
            title: 'States of Matter - Solid, Liquid, Gas 🧊💧💨',
            content: 'Everything has a state! Solid: ice 🧊, rock 🪨 (fixed shape). Liquid: water 💧, juice (takes shape of container). Gas: air 💨, steam (spreads everywhere). Water changes states: ice → water → steam. Matter can change forms!',
            description: 'Learn three states of matter',
            image: '🧊',
            audio: 'matter.mp3',
            duration: '17 min',
            difficulty: 'Intermediate',
            points: 17
          },
          {
            id: 4,
            title: 'Solar System - Planets 🌍🪐',
            content: 'Our solar system has 8 planets! They revolve around the Sun ☀️. Mercury, Venus, Earth 🌍 (our home!), Mars, Jupiter (biggest!), Saturn 🪐 (has rings!), Uranus, Neptune. Earth has Moon 🌙. Space is HUGE!',
            description: 'Explore our solar system',
            image: '🌍',
            audio: 'solar_system.mp3',
            duration: '18 min',
            difficulty: 'Intermediate',
            points: 18
          },
          {
            id: 5,
            title: 'Force & Motion - Push & Pull 💪',
            content: 'Force makes things move! Push 👋 (move away), Pull 🤝 (bring closer). Friction is force that slows things down. Gravity pulls everything down ⬇️. Heavier objects need more force. Rolling ball, swinging swing - all use force!',
            description: 'Understand force and motion',
            image: '💪',
            audio: 'force.mp3',
            duration: '16 min',
            difficulty: 'Intermediate',
            points: 16
          },
          {
            id: 6,
            title: 'Light & Shadow 💡🕯️',
            content: 'Light helps us see! Sun ☀️, bulb 💡, candle 🕯️ give light. Light travels in straight lines. Opaque objects block light and make shadows. Transparent things (glass) let light pass. Shadows are long in morning/evening, short at noon!',
            description: 'Learn about light and shadows',
            image: '💡',
            audio: 'light.mp3',
            duration: '15 min',
            difficulty: 'Intermediate',
            points: 15
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Life & Matter Quiz 🔬',
            description: 'Test your science knowledge!',
            duration: '12 min',
            difficulty: 'Medium',
            questions: [
              {
                question: 'First stage of plant is?',
                options: ['Seed', 'Flower', 'Fruit', 'Leaf'],
                correct: 0,
                emoji: '🌱'
              },
              {
                question: 'Butterfly comes from?',
                options: ['Egg', 'Tadpole', 'Chick', 'Seed'],
                correct: 0,
                emoji: '🦋'
              },
              {
                question: 'Ice is which state of matter?',
                options: ['Liquid', 'Gas', 'Solid', 'Plasma'],
                correct: 2,
                emoji: '🧊'
              },
              {
                question: 'How many planets in solar system?',
                options: ['7', '8', '9', '10'],
                correct: 1,
                emoji: '🌍'
              },
              {
                question: 'Friction does what?',
                options: ['Speeds up', 'Slows down', 'Nothing', 'Heats up'],
                correct: 1,
                emoji: '💪'
              },
              {
                question: 'What makes shadows?',
                options: ['Transparent', 'Opaque', 'Invisible', 'Small'],
                correct: 1,
                emoji: '💡'
              },
              {
                question: 'Largest planet is?',
                options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
                correct: 2,
                emoji: '🪐'
              }
            ],
            points: 28
          }
        ]
      },
      4: {
        lessons: [
          {
            id: 1,
            title: 'Photosynthesis - How Plants Make Food 🌿☀️',
            content: 'Plants make their own food! Leaves have chlorophyll (green color). Using sunlight ☀️, water 💧, and carbon dioxide (CO₂) from air 💨, plants make glucose (sugar) and release oxygen (O₂). This is photosynthesis! We need plants for oxygen!',
            description: 'Learn how plants make food',
            image: '🌿',
            audio: 'photosynthesis.mp3',
            duration: '18 min',
            difficulty: 'Advanced',
            points: 18
          },
          {
            id: 2,
            title: 'Human Digestive System 🍽️',
            content: 'Our body breaks down food! Mouth 👄 chews, teeth 🦷 crush food. Food goes through esophagus to stomach. Stomach has acid that digests food. Small intestine absorbs nutrients. Large intestine removes waste. Whole process takes hours!',
            description: 'How our body digests food',
            image: '🍽️',
            audio: 'digestion.mp3',
            duration: '19 min',
            difficulty: 'Advanced',
            points: 19
          },
          {
            id: 3,
            title: 'Water Cycle - Journey of Water 💧☁️',
            content: 'Water moves in a cycle! Sun ☀️ heats water in oceans/rivers → Evaporation (water becomes vapor). Vapor rises up → Condensation (forms clouds ☁️). Clouds get heavy → Precipitation (rain 🌧️/snow ❄️). Rain falls back to earth. Cycle repeats!',
            description: 'Understanding the water cycle',
            image: '💧',
            audio: 'water_cycle.mp3',
            duration: '17 min',
            difficulty: 'Advanced',
            points: 17
          },
          {
            id: 4,
            title: 'Electricity - Power & Energy ⚡',
            content: 'Electricity gives us power! Flows through wires 🔌. Made in power plants. Bulbs 💡 need electricity to glow. Batteries 🔋 store electricity. Conductors (copper wire) allow current, insulators (rubber) stop it. Always be careful with electricity - it\'s dangerous!',
            description: 'Learn about electricity',
            image: '⚡',
            audio: 'electricity.mp3',
            duration: '18 min',
            difficulty: 'Advanced',
            points: 18
          },
          {
            id: 5,
            title: 'Sound - Vibrations We Hear 🔊',
            content: 'Sound is vibration! When you speak, vocal cords vibrate. Guitar 🎸 strings vibrate making music. Sound travels through air, water, solids. Loud sounds are dangerous. We hear with our ears 👂. Sound can\'t travel in vacuum (space) - no air!',
            description: 'How sound is produced and travels',
            image: '🔊',
            audio: 'sound.mp3',
            duration: '16 min',
            difficulty: 'Advanced',
            points: 16
          },
          {
            id: 6,
            title: 'Ecosystem - Living Together 🌳🦋',
            content: 'Ecosystem is where living and non-living things interact! Forest 🌲 ecosystem has trees, animals 🦌, birds 🐦, soil, water. Food chain: Grass → Rabbit 🐰 → Fox 🦊. Everything depends on each other. Protect ecosystems!',
            description: 'Understanding ecosystems',
            image: '🌳',
            audio: 'ecosystem.mp3',
            duration: '17 min',
            difficulty: 'Advanced',
            points: 17
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Advanced Science Quiz 🎓',
            description: 'For science experts!',
            duration: '15 min',
            difficulty: 'Hard',
            questions: [
              {
                question: 'Plants make food using?',
                options: ['Moonlight', 'Sunlight', 'Starlight', 'Bulb light'],
                correct: 1,
                emoji: '🌿'
              },
              {
                question: 'Where does digestion start?',
                options: ['Stomach', 'Mouth', 'Intestine', 'Liver'],
                correct: 1,
                emoji: '🍽️'
              },
              {
                question: 'Water vapor forms what?',
                options: ['Rain', 'Clouds', 'Snow', 'Ice'],
                correct: 1,
                emoji: '☁️'
              },
              {
                question: 'Copper wire is a?',
                options: ['Insulator', 'Conductor', 'Resistor', 'None'],
                correct: 1,
                emoji: '⚡'
              },
              {
                question: 'Sound is produced by?',
                options: ['Light', 'Heat', 'Vibration', 'Color'],
                correct: 2,
                emoji: '🔊'
              },
              {
                question: 'Grass → Rabbit → Fox is?',
                options: ['Food web', 'Food chain', 'Ecosystem', 'Habitat'],
                correct: 1,
                emoji: '🌳'
              },
              {
                question: 'Plants release which gas?',
                options: ['CO₂', 'O₂', 'N₂', 'H₂'],
                correct: 1,
                emoji: '🌿'
              },
              {
                question: 'Can sound travel in space?',
                options: ['Yes', 'No', 'Sometimes', 'Maybe'],
                correct: 1,
                emoji: '🔊'
              }
            ],
            points: 35
          }
        ]
      },
      5: {
        lessons: [
          {
            id: 1,
            title: 'Human Skeleton & Muscles 🦴💪',
            content: 'Our body has 206 bones! Skeleton gives shape and support. Skull 💀 protects brain, ribs protect heart ❤️ and lungs. Muscles help us move. Biceps, triceps in arms. Exercise makes muscles strong. Calcium (in milk 🥛) makes bones strong!',
            description: 'Learn about bones and muscles',
            image: '🦴',
            audio: 'skeleton.mp3',
            duration: '18 min',
            difficulty: 'Advanced',
            points: 18
          },
          {
            id: 2,
            title: 'Circulatory System - Blood Flow ❤️',
            content: 'Heart ❤️ pumps blood through our body! Blood carries oxygen and nutrients. Arteries carry blood FROM heart (red - oxygenated). Veins bring blood TO heart (blue - deoxygenated). Heart beats 70-80 times per minute. Amazing pump!',
            description: 'How blood circulates in our body',
            image: '❤️',
            audio: 'circulation.mp3',
            duration: '19 min',
            difficulty: 'Advanced',
            points: 19
          },
          {
            id: 3,
            title: 'Microorganisms - Tiny Living Things 🦠',
            content: 'Microorganisms are too small to see without microscope 🔬! Bacteria 🦠, viruses, fungi, protozoa. Some are good (yogurt bacteria), some cause diseases (flu virus). Wash hands to kill germs! Louis Pasteur discovered germs!',
            description: 'Introduction to microorganisms',
            image: '🦠',
            audio: 'microbes.mp3',
            duration: '17 min',
            difficulty: 'Advanced',
            points: 17
          },
          {
            id: 4,
            title: 'Acids, Bases & Indicators 🧪',
            content: 'Acids are sour 🍋 (lemon, vinegar). Bases are bitter (soap 🧼). Neutral is neither (water 💧). Litmus paper tests: turns red in acid, blue in base. pH scale 0-14. 7 is neutral. Below 7 is acid, above 7 is base. Chemistry is fun!',
            description: 'Learn about acids and bases',
            image: '🧪',
            audio: 'acids_bases.mp3',
            duration: '18 min',
            difficulty: 'Advanced',
            points: 18
          },
          {
            id: 5,
            title: 'Natural Resources 🌍💎',
            content: 'Earth gives us resources! Renewable: sun ☀️, wind 💨, water 💧 (won\'t finish). Non-renewable: coal ⚫, oil 🛢️, natural gas (will finish one day). We must save resources! Use solar energy, save water, reduce pollution. Protect Earth!',
            description: 'Understanding Earth\'s resources',
            image: '🌍',
            audio: 'resources.mp3',
            duration: '17 min',
            difficulty: 'Advanced',
            points: 17
          },
          {
            id: 6,
            title: 'Simple Machines ⚙️',
            content: 'Machines make work easier! 6 simple machines: Lever (seesaw), Pulley (flag pole), Wheel & Axle (bicycle 🚲), Inclined Plane (ramp), Wedge (knife 🔪), Screw. Complex machines combine simple machines. Machines multiply force!',
            description: 'Learn about simple machines',
            image: '⚙️',
            audio: 'machines.mp3',
            duration: '18 min',
            difficulty: 'Advanced',
            points: 18
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Expert Science Challenge 🏆',
            description: 'Ultimate science test!',
            duration: '18 min',
            difficulty: 'Hard',
            questions: [
              {
                question: 'How many bones in human body?',
                options: ['106', '156', '206', '256'],
                correct: 2,
                emoji: '🦴'
              },
              {
                question: 'Heart pumps which fluid?',
                options: ['Water', 'Blood', 'Air', 'Food'],
                correct: 1,
                emoji: '❤️'
              },
              {
                question: 'Bacteria can be seen by?',
                options: ['Eyes', 'Glasses', 'Microscope', 'Telescope'],
                correct: 2,
                emoji: '🦠'
              },
              {
                question: 'Lemon juice is?',
                options: ['Acid', 'Base', 'Neutral', 'Salt'],
                correct: 0,
                emoji: '🧪'
              },
              {
                question: 'Which is renewable energy?',
                options: ['Coal', 'Oil', 'Solar', 'Gas'],
                correct: 2,
                emoji: '🌍'
              },
              {
                question: 'Seesaw is which machine?',
                options: ['Pulley', 'Lever', 'Wedge', 'Screw'],
                correct: 1,
                emoji: '⚙️'
              },
              {
                question: 'Arteries carry blood?',
                options: ['To heart', 'From heart', 'Nowhere', 'Both ways'],
                correct: 1,
                emoji: '❤️'
              },
              {
                question: 'pH 7 means?',
                options: ['Acid', 'Base', 'Neutral', 'Strong acid'],
                correct: 2,
                emoji: '🧪'
              },
              {
                question: 'Muscles are made strong by?',
                options: ['Sleeping', 'Eating', 'Exercise', 'Watching TV'],
                correct: 2,
                emoji: '💪'
              },
              {
                question: 'Which will finish one day?',
                options: ['Sunlight', 'Wind', 'Coal', 'Water'],
                correct: 2,
                emoji: '🌍'
              }
            ],
            points: 40
          }
        ]
      }
    }
  },

  social: {
    id: 'social',
    name: 'Social Studies',
    icon: 'people',
    color: '#FECA57',
    description: 'Learn about family, community, and India',
    grades: {
      1: {
        lessons: [
          {
            id: 1,
            title: 'My Family 👨‍👩‍👧‍👦',
            content: 'A family is made of people who love us! Mom, Dad, Brother, Sister, Grandma, Grandpa - they all care for us!',
            description: 'Learn about family members',
            image: '👨‍👩‍👧',
            audio: 'family.mp3',
            duration: '8 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 2,
            title: 'My School 🏫',
            content: 'School is where we learn! We have teachers, friends, classrooms, and playgrounds!',
            description: 'Learn about school and education',
            image: '🎓',
            audio: 'school.mp3',
            duration: '10 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 3,
            title: 'Festivals We Celebrate 🎉',
            content: 'Diwali, Holi, Christmas, Eid - we celebrate many festivals with joy and happiness!',
            description: 'Learn about Indian festivals',
            image: '🪔',
            audio: 'festivals.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          },
          {
            id: 4,
            title: 'Our Country - India 🇮🇳',
            content: 'We live in India! Our national flag has three colors: Orange, White, and Green!',
            description: 'Learn about India',
            image: '🇮🇳',
            audio: 'india.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'Social Studies Quiz 📚',
            description: 'Test your knowledge!',
            duration: '6 min',
            difficulty: 'Easy',
            questions: [
              {
                question: 'Who helps us when we are sick?',
                options: ['Teacher 👨‍🏫', 'Doctor 👨‍⚕️', 'Chef 👨‍🍳', 'Driver 🚗'],
                correct: 1,
                emoji: '👨‍⚕️'
              },
              {
                question: 'Our national flag has ___ colors',
                options: ['2', '3', '4', '5'],
                correct: 1,
                emoji: '🇮🇳'
              },
              {
                question: 'Where do we go to learn?',
                options: ['Market', 'School 🏫', 'Park', 'Hospital'],
                correct: 1,
                emoji: '🏫'
              },
              {
                question: 'Which is an Indian festival?',
                options: ['Diwali 🪔', 'Pizza 🍕', 'Football ⚽', 'Car 🚗'],
                correct: 0,
                emoji: '🪔'
              },
              {
                question: 'Who takes care of us at home?',
                options: ['Teacher', 'Family 👨‍👩‍👧', 'Doctor', 'Police'],
                correct: 1,
                emoji: '❤️'
              }
            ],
            points: 20
          }
        ]
      }
    }
  },

  gk: {
    id: 'gk',
    name: 'General Knowledge',
    icon: 'lightbulb',
    color: '#A8E6CF',
    description: 'Learn about the world around us',
    grades: {
      1: {
        lessons: [
          {
            id: 1,
            title: 'National Symbols 🇮🇳',
            content: 'Peacock is our national bird 🦚, Tiger is our national animal 🐅, and Lotus is our national flower 🪷!',
            description: 'Learn about Indian national symbols',
            image: '🦚',
            audio: 'symbols.mp3',
            duration: '10 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 2,
            title: 'Colors & Shapes 🎨',
            content: 'Red 🔴, Blue 🔵, Green 🟢, Yellow 🟡 - Colors make our world beautiful!',
            description: 'Learn about colors',
            image: '🌈',
            audio: 'colors.mp3',
            duration: '8 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 3,
            title: 'Days of the Week 📅',
            content: 'Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday - 7 days make a week!',
            description: 'Learn days of the week',
            image: '📅',
            audio: 'days.mp3',
            duration: '10 min',
            difficulty: 'Beginner',
            points: 10
          },
          {
            id: 4,
            title: 'Fruits & Vegetables 🍎',
            content: 'Apple, Banana, Mango are fruits! Carrot, Tomato, Potato are vegetables!',
            description: 'Learn about healthy foods',
            image: '🥗',
            audio: 'food.mp3',
            duration: '12 min',
            difficulty: 'Beginner',
            points: 12
          }
        ],
        quizzes: [
          {
            id: 1,
            title: 'GK Champion Quiz 🏆',
            description: 'Show your knowledge!',
            duration: '6 min',
            difficulty: 'Easy',
            questions: [
              {
                question: 'What is our national bird?',
                options: ['Parrot 🦜', 'Peacock 🦚', 'Crow 🐦‍⬛', 'Sparrow 🐦'],
                correct: 1,
                emoji: '🦚'
              },
              {
                question: 'Which is a fruit?',
                options: ['Carrot 🥕', 'Potato 🥔', 'Apple 🍎', 'Onion 🧅'],
                correct: 2,
                emoji: '🍎'
              },
              {
                question: 'How many days in a week?',
                options: ['5', '6', '7', '8'],
                correct: 2,
                emoji: '📅'
              },
              {
                question: 'What color is the sky?',
                options: ['Red', 'Blue 🔵', 'Green', 'Yellow'],
                correct: 1,
                emoji: '☁️'
              },
              {
                question: 'Which is our national animal?',
                options: ['Lion 🦁', 'Tiger 🐅', 'Elephant 🐘', 'Monkey 🐵'],
                correct: 1,
                emoji: '🐅'
              }
            ],
            points: 20
          }
        ]
      }
    }
  }
};

// Rewards and Badges System
export const BADGES = [
  {
    id: 'super_learner',
    name: 'Super Learner 🌟',
    description: 'Complete 10 lessons',
    icon: '🌟',
    requirement: { type: 'lessons', count: 10 },
    points: 100
  },
  {
    id: 'quiz_master',
    name: 'Quiz Master 🎯',
    description: 'Get 5 perfect scores',
    icon: '🎯',
    requirement: { type: 'perfect_quizzes', count: 5 },
    points: 150
  },
  {
    id: 'math_magician',
    name: 'Math Magician 🧮',
    description: 'Complete all Math lessons',
    icon: '🧮',
    requirement: { type: 'subject_complete', subject: 'maths' },
    points: 200
  },
  {
    id: 'english_expert',
    name: 'English Expert 📖',
    description: 'Complete all English lessons',
    icon: '📖',
    requirement: { type: 'subject_complete', subject: 'english' },
    points: 200
  },
  {
    id: 'science_explorer',
    name: 'Science Explorer 🔬',
    description: 'Complete all Science lessons',
    icon: '🔬',
    requirement: { type: 'subject_complete', subject: 'science' },
    points: 200
  },
  {
    id: 'streak_champion',
    name: 'Streak Champion 🔥',
    description: 'Learn for 7 days in a row',
    icon: '🔥',
    requirement: { type: 'streak', days: 7 },
    points: 250
  }
];

export const STICKERS = [
  { id: 1, name: 'Gold Star', emoji: '⭐', rarity: 'common' },
  { id: 2, name: 'Trophy', emoji: '🏆', rarity: 'rare' },
  { id: 3, name: 'Medal', emoji: '🏅', rarity: 'common' },
  { id: 4, name: 'Crown', emoji: '👑', rarity: 'epic' },
  { id: 5, name: 'Rainbow', emoji: '🌈', rarity: 'rare' },
  { id: 6, name: 'Rocket', emoji: '🚀', rarity: 'epic' },
  { id: 7, name: 'Heart', emoji: '❤️', rarity: 'common' },
  { id: 8, name: 'Diamond', emoji: '💎', rarity: 'legendary' },
  { id: 9, name: 'Fire', emoji: '🔥', rarity: 'rare' },
  { id: 10, name: 'Sparkles', emoji: '✨', rarity: 'common' }
];

export const ENCOURAGEMENT_MESSAGES = {
  correct: [
    'Amazing! 🎉',
    'Well Done! ⭐',
    'You\'re a Star! 🌟',
    'Excellent! 👏',
    'Brilliant! 💯',
    'Super! 🦸',
    'Fantastic! 🎊',
    'Perfect! ✨'
  ],
  incorrect: [
    'Try Again! 💪',
    'You Can Do It! 🌟',
    'Almost There! 🎯',
    'Keep Trying! 💫',
    'Don\'t Give Up! 🚀',
    'One More Try! 🌈'
  ],
  completed: [
    'You\'re Amazing! 🏆',
    'Lesson Complete! 🎉',
    'Great Job! 🌟',
    'You Did It! 🎊',
    'Wonderful Work! ✨'
  ]
};
