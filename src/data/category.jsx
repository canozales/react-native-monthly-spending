import {
  DogSvg,
  Cat,
  Shop,
  Food,
  Hospital,
  Others,
  Recreation,
  Car,
  Plane,
  Electric,
  Badminton,
  Bed,
} from "../../assets/svgs";

export const categories = {
  dog: <DogSvg />,
  cat: <Cat />,
  shopping: <Shop />,
  food: <Food />,
  treatment: <Hospital />,
  others: <Others />,
  recreation: <Recreation />,
  transportation: <Car />,
  plane: <Plane />,
  electric: <Electric />,
  badminton: <Badminton />,
  bed: <Bed />,
};

export const categoryLists = [
  { name: "dog", image: <DogSvg /> },
  { name: "cat", image: <Cat /> },
  { name: "shopping", image: <Shop /> },
  { name: "food", image: <Food /> },
  { name: "treatment", image: <Hospital /> },
  { name: "others", image: <Others /> },
  { name: "recreation", image: <Recreation /> },
  { name: "transportation", image: <Car /> },
  { name: "plane", image: <Plane /> },
  { name: "electric", image: <Electric /> },
  { name: "badminton", image: <Badminton /> },
  { name: "bed", image: <Bed /> },
];
