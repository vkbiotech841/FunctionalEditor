// export class QuestionClass {
//     "id"?: number;
//     "question": string;
//     "a": string;
//     "b": string;
//     "c": string;
//     "d": string;
//     "answer": string;
//     "selected"?: string;
//     "images"?: any[];
// }

export class QuestionClass {
    "questionNumber": number;
    "question": string;
    "correctAnswer": string;
    "options": [
        {
            "option_no": "a",
            "option": any;
        },
        {
            "option_no": "b",
            "option": any;
        },
        {
            "option_no": "c",
            "option": any;
        },
        {
            "option_no": "d",
            "option": any;
        }
    ];
}


