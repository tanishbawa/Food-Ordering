import { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';

import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();

    const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch('https://custom-hooks-26f46-default-rtdb.firebaseio.com/meals.json');

        if (!response.ok) {
            console.log("dddd");
            throw new Error("Something went Wrong!!");
        }

        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData) {
            loadedMeals.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price
            });
        }

        console.log(loadedMeals);
        setMeals(loadedMeals);
        setIsLoading(false);
    }

    useEffect(() => {

        fetchData().catch(error => {
            setIsLoading(false);
            console.log(error);
            setHttpError(error.message);
        });

    }, []);

    const mealItems = meals.map((meal) => {
        return (
            <MealItem key={meal.id} meal={meal} />
        );
    });

    if (isLoading) {
        return <section>
            <p className={classes.isLoading}>Loading...</p>
        </section>
    }
    if (httpError) {
        return <section>
            <p className={classes.mealsError}>{httpError}</p>
        </section>
    }

    return (
        <Card className={classes.meals}>
            <ul>
                {mealItems}
            </ul>
        </Card>
    );
}

export default AvailableMeals;