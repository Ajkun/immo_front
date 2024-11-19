export interface details{
  id: number;
  title: string;
  icon: string;
  value: string;
  details?: string;
  list?: boolean;
  listDetails? : listData[]
}

export interface listData{
  data: string;
}

export const contactDetailsData = [
  {
    id: 1,
    title: 'Ou',
    icon: 'map-pin',
    value: 'where',
    details:
      'Avenue Annakhil Résidence Soundouss II Hay Riad Rabat, Maroc',
  },
  {
    id: 2,
    title: 'Second branch',
    icon: 'map-pin',
    value: 'second_branch',
    details:
      '5415 Spring garden Road <br> Halifax, IL 97230 <br> +91 187230014',
  },
  {
    id: 3,
    title: 'Online service',
    icon: 'phone',
    value: 'online_service',
    list: true,
    listDetails: [
      {
        data: 'Num de tel',
      },
      {
        data: ': (+212) 05 37 57 52 18',
      },
      {
        data: 'Lundi - Vendred',
      },
      {
        data: 'De 9h00 à 16h00',
      },
    ],
  },
];
