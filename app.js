// class BMR
class BMR {
    constructor(gender, weight, height, age, activity, goal){
        this.gender = gender;
        this.weight = weight;
        this.height = height;
        this.age = age;
        this.activity = activity;
        this.goal = goal;
    }
}
// class UI
class UI {

    DOM(){
        const DOMstrings = {
            form: '.form',
            gender: 'input[name="gender"]:checked',
            age: '#age',
            weight: '#weight',
            height: '#height',
            activity: '.select-activity',
            goal: '.select-goal',
            resultCard: '.result',
            resultGoal: '.result__goal',
            resultCalories: '.result__calories',
            proteins: '.proteins',
            proteinsCalories: '.proteins-calories',
            carbohydrates: '.carbohydrates',
            carbohydratesCalories: '.carbohydrates-calories',
            fat: '.fat',
            fatCalories: '.fat-calories',
            loading: '.loading',
            message: '.message'
        }

        return DOMstrings;
    }

    getInputs() {
        let data = {}, gender, age = '', weight = '', height = '', activity, goal;
        const dom = this.DOM();

        age = document.querySelector(dom.age).value;
        gender = document.querySelector(dom.gender).value;
        weight = document.querySelector(dom.weight).value;
        height = document.querySelector(dom.height).value;
        activity = document.querySelector(dom.activity).value;
        goal = document.querySelector(dom.goal).value;

        if(age === '' || weight === '' || height === '') {
            data = 'empty';
        }else {
            age = Number(age);
            weight = Number(weight);
            height = Number(height);

            if(weight < 0 || height < 0 || weight === 0 || height === 0) {
                data = 'smallerThanZero';
            }
            else if (isNaN(age) || isNaN(weight) || isNaN(height)) {
                data = 'incorrectValues';
            }
            else if (!Number.isInteger(age) || age > 99 || age < 12) {
                data = 'incorrectAge';
            }
            else if (weight < 30 || height < 100) {
                data = 'incorrectWeightAndHeight';
            }
            else {
    
                data = {
                    gender: gender,
                    age: age,
                    weight: weight,
                    height: height,
                    activity: activity,
                    goal: goal
                 }
         
            }

        }
       
        
        return data;
    }

    showResults(calculatedData) {
        const dom = this.DOM();

        document.querySelector(dom.resultCard).style.display = 'block';

        if(calculatedData.yourGoal === 'gain-weight') {
            document.querySelector(dom.resultGoal).textContent = 'Aby przytyć, uwzględniając Twoje całkowite zapotrzebowanie kaloryczne, powinieneś dostarczać organizmowi*:';
        }
        else if(calculatedData.yourGoal === 'sustain-weight') {
            document.querySelector(dom.resultGoal).textContent = 'Aby utrzymać wagę, uwzględniając Twoje całkowite zapotrzebowanie kaloryczne, powinieneś dostarczać organizmowi*:';
        }
        else {
            document.querySelector(dom.resultGoal).textContent = 'Aby schudnąć, uwzględniając Twoje całkowite zapotrzebowanie kaloryczne, powinieneś dostarczać organizmowi*:';
        }

        
        document.querySelector(dom.resultCalories).textContent = calculatedData.calories + ' kcal';

        document.querySelector(dom.proteins).textContent = calculatedData.proteins + 'g';
        document.querySelector(dom.proteinsCalories).textContent = calculatedData.proteinsCalories + ' kcal';

        document.querySelector(dom.carbohydrates).textContent = calculatedData.carbohydrates + 'g';
        document.querySelector(dom.carbohydratesCalories).textContent = calculatedData.carbohydratesCalories + ' kcal';


        document.querySelector(dom.fat).textContent = calculatedData.fat + 'g';
        document.querySelector(dom.fatCalories).textContent = calculatedData.fatCalories + ' kcal';
        
    }

    calculateAll(gender, weight, height, age, activity, goal) {
        let countedBMR = 0, calories = 0, proteins = 0, carbohydrates = 0, fat = 0, proteinsCalories = 0,
        carbohydratesCalories = 0,
        fatCalories = 0, data;

        const dom = this.DOM();

        //Check if man or woman
        if(gender === 'man') {

             // count BMR
             countedBMR = (9.99 * weight) + ((6.25 * height) - (4.92 * age)) + 5;

             // check volume of activity
             switch(activity) {
                 case 'no-activity':
                    calories = countedBMR * 1.2;
                 break;

                 case 'low-activity':
                    calories = countedBMR * 1.3;
                 break;

                 case 'medium-activity':
                    calories = countedBMR * 1.5;
                 break;

                 case 'high-activity':
                    calories = countedBMR * 1.7;
                 break;

                 default:
                    calories = countedBMR * 1.9;
                 break;

             }

             switch(goal) {
                 case 'gain-weight':
                    calories = calories + 300;
                 break;

                 case 'sustain-weight':
                    calories = calories;
                 break;

                 default:
                    calories = calories - 300;
                 break;
             }

             

        }else if(gender === 'woman') {

             // count BMR
             countedBMR = (9.99 * weight) + ((6.25 * height) - (4.92 * age)) - 161;

             // check volume of activity
             switch(activity) {
                case 'no-activity':
                   calories = countedBMR * 1.2;
                break;

                case 'low-activity':
                   calories = countedBMR * 1.3;
                break;

                case 'medium-activity':
                   calories = countedBMR * 1.5;
                break;

                case 'high-activity':
                   calories = countedBMR * 1.7;
                break;

                default:
                   calories = countedBMR * 1.9;
                break;

            }

            switch(goal) {
                case 'gain-weight':
                   calories = calories + 300;
                break;

                case 'sustain-weight':
                   calories = calories;
                break;

                default:
                   calories = calories - 300;
                break;
            }


        }

        

        proteinsCalories = proteins = (.15 * calories);
        carbohydratesCalories = (.55 * calories);
        fatCalories = (.30 * calories);

        proteins = (.15 * calories) / 4;
        carbohydrates = (.55 * calories) / 4;
        fat = (.30 * calories) / 9;
       
        // return BMR and CALORIES
        return data = {
            countedBMR: Math.round(countedBMR),
            calories: Math.round(calories),
            yourGoal: goal,
            proteins: Math.round(proteins),
            proteinsCalories: Math.round(proteinsCalories),
            carbohydrates: Math.round(carbohydrates),
            carbohydratesCalories: Math.round(carbohydratesCalories),
            fat: Math.round(fat),
            fatCalories: Math.round(fatCalories)
        };
    }

    showMessage(msg, className) {
        document.querySelector(this.DOM().message).innerHTML = `<p class="alert ${className}">${msg}</p>`;

        setTimeout(() => {
            document.querySelector(this.DOM().message).innerHTML = '';
        }, 4000);
    }
}

// instatiate UI
const ui = new UI;

// Event listeners
document.querySelector(ui.DOM().form).addEventListener('submit', (e) => {
    // prevent default
    e.preventDefault();

     // instatiate UI
     const ui = new UI;
     const dom = ui.DOM()

    // hide loading icon
    document.querySelector(dom.resultCard).style.display = 'none';

   
    // Get fields input values
    const inputValues = ui.getInputs();

    if(inputValues === 'empty'){
        ui.showMessage('Wszystkie pola są wymagane!', 'error');
    }
    else if(inputValues === 'smallerThanZero') {
        ui.showMessage('Liczby nie mogą być równe ani mniejsze niż zero!', 'error');
    }
    else if(inputValues === 'incorrectValues') {
        ui.showMessage('Wszystkie pola muszą być liczbami!', 'error');
    }
    else if(inputValues === 'incorrectAge') {
        ui.showMessage('Wiek musi być liczbą całkowitą z przedziału 12-99!', 'error');
    }
    else if (inputValues === 'incorrectWeightAndHeight') {
        ui.showMessage('Waga nie może być mniejsza niż 30, a wzrost nie może być mniejszy niż 100', 'error');
    }
    else {
        // VALIDATED

        // Instatiate BMR
        const bmr = new BMR(inputValues.gender, inputValues.weight, inputValues.height, inputValues.age, inputValues.activity, inputValues.goal);

        //Show loading icon
        document.querySelector(dom.loading).style.display = 'block';
        // all calculations
        const calculateData = ui.calculateAll(bmr.gender, bmr.weight, bmr.height, bmr.age, bmr.activity, bmr.goal);

        // show results in UI
        setTimeout(() =>{
            ui.showResults(calculateData);
            //Show loading icon
            document.querySelector(dom.loading).style.display = 'none';
        }, 1000);

    }

    
 
    
});
