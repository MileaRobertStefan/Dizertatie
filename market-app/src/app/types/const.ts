import { Product } from "./types";

export class C {
  public static host: string = "http://localhost:3000";
  public static API: string = C.host + "/api/v1/";

  public static products: Product[] = [
    {
      id: 1,
      title: 'Rainbow Macaw Parrot',
      description: 'A beautiful and friendly macaw parrot that loves to sing and dance.',
      price: 799.99,
      currency: 'USD',
      photos: ['https://www.thefactsite.com/wp-content/uploads/2018/07/facts-about-parrots.jpg', 'https://www.petbarn.com.au/petspot/app/uploads/2019/03/shutterstock_125089496.jpg'],
      discussionID: 'discuss-1',
      category: 'Pets',
      brand: 'Exotic Birds Inc.',
      condition: 'New',
      ownerID: 0
    },
    {
      id: 2,
      title: 'Mojito Cocktail Kit',
      description: 'Everything you need to make the perfect mojito cocktail, including premium rum, fresh limes, and mint leaves.',
      price: 49.99,
      currency: 'USD',
      photos: ['https://www.e-vet.ro/wp-content/uploads/2021/04/papagalul-nimfa.jpg', 'https://animaledecompanie.info/wp-content/uploads/2012/03/nimfe.jpg'],
      discussionID: 'discuss-2',
      category: 'Food & Drink',
      brand: 'Cocktail Kingdom',
      condition: 'New',
      ownerID: 0
    },
    {
      id: 3,
      title: 'Beautiful Parakeet',
      description: 'Meet our gorgeous parakeet, a stunning bird with bright green feathers and a charming personality. Our parakeet is just over a year old and has been hand-raised since hatching. He loves to interact with humans and will happily perch on your finger for a cuddle or a scratch behind the ears. He is also a talented talker, with a growing vocabulary of words and phrases that he loves to show off. Our parakeet comes with a spacious cage, a selection of toys, and a bag of his favorite food.',
      price: 149.99,
      currency: 'USD',
      photos: ['https://zooresita.ro/wp-content/uploads/2017/03/1-36.jpg'],
      discussionID: 'discuss-3',
      category: 'Pets',
      brand: 'Zara',
      condition: 'Excellent',
      ownerID: 0
    }
  ];
}     