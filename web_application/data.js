const QUESTIONS_DATA = [
  {
    "id": 0,
    "image_id": "2007_000904",
    "target_type": "Target_1",
    "original_image": "data/2007_000904/Target_1/original.png",
    "heatmap_image": "data/2007_000904/Target_1/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cow",
    "method": "LeGrad"
  },
  {
    "id": 1,
    "image_id": "2007_000904",
    "target_type": "Target_1",
    "original_image": "data/2007_000904/Target_1/original.png",
    "heatmap_image": "data/2007_000904/Target_1/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cow",
    "method": "LeGrad OMP"
  },
  {
    "id": 2,
    "image_id": "2007_000904",
    "target_type": "Target_2",
    "original_image": "data/2007_000904/Target_2/original.png",
    "heatmap_image": "data/2007_000904/Target_2/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad"
  },
  {
    "id": 3,
    "image_id": "2007_000904",
    "target_type": "Target_2",
    "original_image": "data/2007_000904/Target_2/original.png",
    "heatmap_image": "data/2007_000904/Target_2/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad OMP"
  },
  {
    "id": 4,
    "image_id": "2007_000904",
    "target_type": "Target_fake",
    "original_image": "data/2007_000904/Target_fake/original.png",
    "heatmap_image": "data/2007_000904/Target_fake/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 5,
    "image_id": "2007_000904",
    "target_type": "Target_fake",
    "original_image": "data/2007_000904/Target_fake/original.png",
    "heatmap_image": "data/2007_000904/Target_fake/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 6,
    "image_id": "2007_001594",
    "target_type": "Target_1",
    "original_image": "data/2007_001594/Target_1/original.png",
    "heatmap_image": "data/2007_001594/Target_1/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 7,
    "image_id": "2007_001594",
    "target_type": "Target_1",
    "original_image": "data/2007_001594/Target_1/original.png",
    "heatmap_image": "data/2007_001594/Target_1/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 8,
    "image_id": "2007_001594",
    "target_type": "Target_2",
    "original_image": "data/2007_001594/Target_2/original.png",
    "heatmap_image": "data/2007_001594/Target_2/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad"
  },
  {
    "id": 9,
    "image_id": "2007_001594",
    "target_type": "Target_2",
    "original_image": "data/2007_001594/Target_2/original.png",
    "heatmap_image": "data/2007_001594/Target_2/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad OMP"
  },
  {
    "id": 10,
    "image_id": "2007_001594",
    "target_type": "Target_fake",
    "original_image": "data/2007_001594/Target_fake/original.png",
    "heatmap_image": "data/2007_001594/Target_fake/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 11,
    "image_id": "2007_001594",
    "target_type": "Target_fake",
    "original_image": "data/2007_001594/Target_fake/original.png",
    "heatmap_image": "data/2007_001594/Target_fake/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 12,
    "image_id": "2007_001763",
    "target_type": "Target_1",
    "original_image": "data/2007_001763/Target_1/original.png",
    "heatmap_image": "data/2007_001763/Target_1/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad"
  },
  {
    "id": 13,
    "image_id": "2007_001763",
    "target_type": "Target_1",
    "original_image": "data/2007_001763/Target_1/original.png",
    "heatmap_image": "data/2007_001763/Target_1/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad OMP"
  },
  {
    "id": 14,
    "image_id": "2007_001763",
    "target_type": "Target_2",
    "original_image": "data/2007_001763/Target_2/original.png",
    "heatmap_image": "data/2007_001763/Target_2/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 15,
    "image_id": "2007_001763",
    "target_type": "Target_2",
    "original_image": "data/2007_001763/Target_2/original.png",
    "heatmap_image": "data/2007_001763/Target_2/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 16,
    "image_id": "2007_001763",
    "target_type": "Target_fake",
    "original_image": "data/2007_001763/Target_fake/original.png",
    "heatmap_image": "data/2007_001763/Target_fake/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 17,
    "image_id": "2007_001763",
    "target_type": "Target_fake",
    "original_image": "data/2007_001763/Target_fake/original.png",
    "heatmap_image": "data/2007_001763/Target_fake/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 18,
    "image_id": "2007_001825",
    "target_type": "Target_1",
    "original_image": "data/2007_001825/Target_1/original.png",
    "heatmap_image": "data/2007_001825/Target_1/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad"
  },
  {
    "id": 19,
    "image_id": "2007_001825",
    "target_type": "Target_1",
    "original_image": "data/2007_001825/Target_1/original.png",
    "heatmap_image": "data/2007_001825/Target_1/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad OMP"
  },
  {
    "id": 20,
    "image_id": "2007_001825",
    "target_type": "Target_2",
    "original_image": "data/2007_001825/Target_2/original.png",
    "heatmap_image": "data/2007_001825/Target_2/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 21,
    "image_id": "2007_001825",
    "target_type": "Target_2",
    "original_image": "data/2007_001825/Target_2/original.png",
    "heatmap_image": "data/2007_001825/Target_2/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 22,
    "image_id": "2007_001825",
    "target_type": "Target_fake",
    "original_image": "data/2007_001825/Target_fake/original.png",
    "heatmap_image": "data/2007_001825/Target_fake/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 23,
    "image_id": "2007_001825",
    "target_type": "Target_fake",
    "original_image": "data/2007_001825/Target_fake/original.png",
    "heatmap_image": "data/2007_001825/Target_fake/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 24,
    "image_id": "2007_002268",
    "target_type": "Target_1",
    "original_image": "data/2007_002268/Target_1/original.png",
    "heatmap_image": "data/2007_002268/Target_1/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad"
  },
  {
    "id": 25,
    "image_id": "2007_002268",
    "target_type": "Target_1",
    "original_image": "data/2007_002268/Target_1/original.png",
    "heatmap_image": "data/2007_002268/Target_1/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad OMP"
  },
  {
    "id": 26,
    "image_id": "2007_002268",
    "target_type": "Target_2",
    "original_image": "data/2007_002268/Target_2/original.png",
    "heatmap_image": "data/2007_002268/Target_2/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 27,
    "image_id": "2007_002268",
    "target_type": "Target_2",
    "original_image": "data/2007_002268/Target_2/original.png",
    "heatmap_image": "data/2007_002268/Target_2/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 28,
    "image_id": "2007_002268",
    "target_type": "Target_fake",
    "original_image": "data/2007_002268/Target_fake/original.png",
    "heatmap_image": "data/2007_002268/Target_fake/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 29,
    "image_id": "2007_002268",
    "target_type": "Target_fake",
    "original_image": "data/2007_002268/Target_fake/original.png",
    "heatmap_image": "data/2007_002268/Target_fake/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 30,
    "image_id": "2007_002597",
    "target_type": "Target_1",
    "original_image": "data/2007_002597/Target_1/original.png",
    "heatmap_image": "data/2007_002597/Target_1/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad"
  },
  {
    "id": 31,
    "image_id": "2007_002597",
    "target_type": "Target_1",
    "original_image": "data/2007_002597/Target_1/original.png",
    "heatmap_image": "data/2007_002597/Target_1/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad OMP"
  },
  {
    "id": 32,
    "image_id": "2007_002597",
    "target_type": "Target_2",
    "original_image": "data/2007_002597/Target_2/original.png",
    "heatmap_image": "data/2007_002597/Target_2/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 33,
    "image_id": "2007_002597",
    "target_type": "Target_2",
    "original_image": "data/2007_002597/Target_2/original.png",
    "heatmap_image": "data/2007_002597/Target_2/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 34,
    "image_id": "2007_002597",
    "target_type": "Target_fake",
    "original_image": "data/2007_002597/Target_fake/original.png",
    "heatmap_image": "data/2007_002597/Target_fake/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 35,
    "image_id": "2007_002597",
    "target_type": "Target_fake",
    "original_image": "data/2007_002597/Target_fake/original.png",
    "heatmap_image": "data/2007_002597/Target_fake/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 36,
    "image_id": "2007_004537",
    "target_type": "Target_1",
    "original_image": "data/2007_004537/Target_1/original.png",
    "heatmap_image": "data/2007_004537/Target_1/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cow",
    "method": "LeGrad"
  },
  {
    "id": 37,
    "image_id": "2007_004537",
    "target_type": "Target_1",
    "original_image": "data/2007_004537/Target_1/original.png",
    "heatmap_image": "data/2007_004537/Target_1/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cow",
    "method": "LeGrad OMP"
  },
  {
    "id": 38,
    "image_id": "2007_004537",
    "target_type": "Target_2",
    "original_image": "data/2007_004537/Target_2/original.png",
    "heatmap_image": "data/2007_004537/Target_2/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad"
  },
  {
    "id": 39,
    "image_id": "2007_004537",
    "target_type": "Target_2",
    "original_image": "data/2007_004537/Target_2/original.png",
    "heatmap_image": "data/2007_004537/Target_2/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad OMP"
  },
  {
    "id": 40,
    "image_id": "2007_004537",
    "target_type": "Target_fake",
    "original_image": "data/2007_004537/Target_fake/original.png",
    "heatmap_image": "data/2007_004537/Target_fake/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 41,
    "image_id": "2007_004537",
    "target_type": "Target_fake",
    "original_image": "data/2007_004537/Target_fake/original.png",
    "heatmap_image": "data/2007_004537/Target_fake/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 42,
    "image_id": "2007_005114",
    "target_type": "Target_1",
    "original_image": "data/2007_005114/Target_1/original.png",
    "heatmap_image": "data/2007_005114/Target_1/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cow",
    "method": "LeGrad"
  },
  {
    "id": 43,
    "image_id": "2007_005114",
    "target_type": "Target_1",
    "original_image": "data/2007_005114/Target_1/original.png",
    "heatmap_image": "data/2007_005114/Target_1/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cow",
    "method": "LeGrad OMP"
  },
  {
    "id": 44,
    "image_id": "2007_005114",
    "target_type": "Target_2",
    "original_image": "data/2007_005114/Target_2/original.png",
    "heatmap_image": "data/2007_005114/Target_2/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad"
  },
  {
    "id": 45,
    "image_id": "2007_005114",
    "target_type": "Target_2",
    "original_image": "data/2007_005114/Target_2/original.png",
    "heatmap_image": "data/2007_005114/Target_2/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad OMP"
  },
  {
    "id": 46,
    "image_id": "2007_005114",
    "target_type": "Target_fake",
    "original_image": "data/2007_005114/Target_fake/original.png",
    "heatmap_image": "data/2007_005114/Target_fake/legrad.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 47,
    "image_id": "2007_005114",
    "target_type": "Target_fake",
    "original_image": "data/2007_005114/Target_fake/original.png",
    "heatmap_image": "data/2007_005114/Target_fake/legrad_omp.png",
    "options": [
      "Cow",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 48,
    "image_id": "2007_006944",
    "target_type": "Target_1",
    "original_image": "data/2007_006944/Target_1/original.png",
    "heatmap_image": "data/2007_006944/Target_1/legrad.png",
    "options": [
      "Horse",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Horse",
    "method": "LeGrad"
  },
  {
    "id": 49,
    "image_id": "2007_006944",
    "target_type": "Target_1",
    "original_image": "data/2007_006944/Target_1/original.png",
    "heatmap_image": "data/2007_006944/Target_1/legrad_omp.png",
    "options": [
      "Horse",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Horse",
    "method": "LeGrad OMP"
  },
  {
    "id": 50,
    "image_id": "2007_006944",
    "target_type": "Target_2",
    "original_image": "data/2007_006944/Target_2/original.png",
    "heatmap_image": "data/2007_006944/Target_2/legrad.png",
    "options": [
      "Horse",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad"
  },
  {
    "id": 51,
    "image_id": "2007_006944",
    "target_type": "Target_2",
    "original_image": "data/2007_006944/Target_2/original.png",
    "heatmap_image": "data/2007_006944/Target_2/legrad_omp.png",
    "options": [
      "Horse",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad OMP"
  },
  {
    "id": 52,
    "image_id": "2007_006944",
    "target_type": "Target_fake",
    "original_image": "data/2007_006944/Target_fake/original.png",
    "heatmap_image": "data/2007_006944/Target_fake/legrad.png",
    "options": [
      "Horse",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 53,
    "image_id": "2007_006944",
    "target_type": "Target_fake",
    "original_image": "data/2007_006944/Target_fake/original.png",
    "heatmap_image": "data/2007_006944/Target_fake/legrad_omp.png",
    "options": [
      "Horse",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 54,
    "image_id": "2007_007417",
    "target_type": "Target_1",
    "original_image": "data/2007_007417/Target_1/original.png",
    "heatmap_image": "data/2007_007417/Target_1/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad"
  },
  {
    "id": 55,
    "image_id": "2007_007417",
    "target_type": "Target_1",
    "original_image": "data/2007_007417/Target_1/original.png",
    "heatmap_image": "data/2007_007417/Target_1/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad OMP"
  },
  {
    "id": 56,
    "image_id": "2007_007417",
    "target_type": "Target_2",
    "original_image": "data/2007_007417/Target_2/original.png",
    "heatmap_image": "data/2007_007417/Target_2/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 57,
    "image_id": "2007_007417",
    "target_type": "Target_2",
    "original_image": "data/2007_007417/Target_2/original.png",
    "heatmap_image": "data/2007_007417/Target_2/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 58,
    "image_id": "2007_007417",
    "target_type": "Target_fake",
    "original_image": "data/2007_007417/Target_fake/original.png",
    "heatmap_image": "data/2007_007417/Target_fake/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 59,
    "image_id": "2007_007417",
    "target_type": "Target_fake",
    "original_image": "data/2007_007417/Target_fake/original.png",
    "heatmap_image": "data/2007_007417/Target_fake/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 60,
    "image_id": "2007_009331",
    "target_type": "Target_1",
    "original_image": "data/2007_009331/Target_1/original.png",
    "heatmap_image": "data/2007_009331/Target_1/legrad.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 61,
    "image_id": "2007_009331",
    "target_type": "Target_1",
    "original_image": "data/2007_009331/Target_1/original.png",
    "heatmap_image": "data/2007_009331/Target_1/legrad_omp.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 62,
    "image_id": "2007_009331",
    "target_type": "Target_2",
    "original_image": "data/2007_009331/Target_2/original.png",
    "heatmap_image": "data/2007_009331/Target_2/legrad.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad"
  },
  {
    "id": 63,
    "image_id": "2007_009331",
    "target_type": "Target_2",
    "original_image": "data/2007_009331/Target_2/original.png",
    "heatmap_image": "data/2007_009331/Target_2/legrad_omp.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad OMP"
  },
  {
    "id": 64,
    "image_id": "2007_009331",
    "target_type": "Target_fake",
    "original_image": "data/2007_009331/Target_fake/original.png",
    "heatmap_image": "data/2007_009331/Target_fake/legrad.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 65,
    "image_id": "2007_009331",
    "target_type": "Target_fake",
    "original_image": "data/2007_009331/Target_fake/original.png",
    "heatmap_image": "data/2007_009331/Target_fake/legrad_omp.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 66,
    "image_id": "2008_002536",
    "target_type": "Target_1",
    "original_image": "data/2008_002536/Target_1/original.png",
    "heatmap_image": "data/2008_002536/Target_1/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 67,
    "image_id": "2008_002536",
    "target_type": "Target_1",
    "original_image": "data/2008_002536/Target_1/original.png",
    "heatmap_image": "data/2008_002536/Target_1/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 68,
    "image_id": "2008_002536",
    "target_type": "Target_2",
    "original_image": "data/2008_002536/Target_2/original.png",
    "heatmap_image": "data/2008_002536/Target_2/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad"
  },
  {
    "id": 69,
    "image_id": "2008_002536",
    "target_type": "Target_2",
    "original_image": "data/2008_002536/Target_2/original.png",
    "heatmap_image": "data/2008_002536/Target_2/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad OMP"
  },
  {
    "id": 70,
    "image_id": "2008_002536",
    "target_type": "Target_fake",
    "original_image": "data/2008_002536/Target_fake/original.png",
    "heatmap_image": "data/2008_002536/Target_fake/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 71,
    "image_id": "2008_002536",
    "target_type": "Target_fake",
    "original_image": "data/2008_002536/Target_fake/original.png",
    "heatmap_image": "data/2008_002536/Target_fake/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 72,
    "image_id": "2009_001885",
    "target_type": "Target_1",
    "original_image": "data/2009_001885/Target_1/original.png",
    "heatmap_image": "data/2009_001885/Target_1/legrad.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 73,
    "image_id": "2009_001885",
    "target_type": "Target_1",
    "original_image": "data/2009_001885/Target_1/original.png",
    "heatmap_image": "data/2009_001885/Target_1/legrad_omp.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 74,
    "image_id": "2009_001885",
    "target_type": "Target_2",
    "original_image": "data/2009_001885/Target_2/original.png",
    "heatmap_image": "data/2009_001885/Target_2/legrad.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad"
  },
  {
    "id": 75,
    "image_id": "2009_001885",
    "target_type": "Target_2",
    "original_image": "data/2009_001885/Target_2/original.png",
    "heatmap_image": "data/2009_001885/Target_2/legrad_omp.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Horse",
    "method": "LeGrad OMP"
  },
  {
    "id": 76,
    "image_id": "2009_001885",
    "target_type": "Target_fake",
    "original_image": "data/2009_001885/Target_fake/original.png",
    "heatmap_image": "data/2009_001885/Target_fake/legrad.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 77,
    "image_id": "2009_001885",
    "target_type": "Target_fake",
    "original_image": "data/2009_001885/Target_fake/original.png",
    "heatmap_image": "data/2009_001885/Target_fake/legrad_omp.png",
    "options": [
      "Dog",
      "Horse",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 78,
    "image_id": "2010_002763",
    "target_type": "Target_1",
    "original_image": "data/2010_002763/Target_1/original.png",
    "heatmap_image": "data/2010_002763/Target_1/legrad.png",
    "options": [
      "Cat",
      "Cow",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad"
  },
  {
    "id": 79,
    "image_id": "2010_002763",
    "target_type": "Target_1",
    "original_image": "data/2010_002763/Target_1/original.png",
    "heatmap_image": "data/2010_002763/Target_1/legrad_omp.png",
    "options": [
      "Cat",
      "Cow",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad OMP"
  },
  {
    "id": 80,
    "image_id": "2010_002763",
    "target_type": "Target_2",
    "original_image": "data/2010_002763/Target_2/original.png",
    "heatmap_image": "data/2010_002763/Target_2/legrad.png",
    "options": [
      "Cat",
      "Cow",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Cow",
    "method": "LeGrad"
  },
  {
    "id": 81,
    "image_id": "2010_002763",
    "target_type": "Target_2",
    "original_image": "data/2010_002763/Target_2/original.png",
    "heatmap_image": "data/2010_002763/Target_2/legrad_omp.png",
    "options": [
      "Cat",
      "Cow",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Cow",
    "method": "LeGrad OMP"
  },
  {
    "id": 82,
    "image_id": "2010_002763",
    "target_type": "Target_fake",
    "original_image": "data/2010_002763/Target_fake/original.png",
    "heatmap_image": "data/2010_002763/Target_fake/legrad.png",
    "options": [
      "Cat",
      "Cow",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 83,
    "image_id": "2010_002763",
    "target_type": "Target_fake",
    "original_image": "data/2010_002763/Target_fake/original.png",
    "heatmap_image": "data/2010_002763/Target_fake/legrad_omp.png",
    "options": [
      "Cat",
      "Cow",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 84,
    "image_id": "2010_003670",
    "target_type": "Target_1",
    "original_image": "data/2010_003670/Target_1/original.png",
    "heatmap_image": "data/2010_003670/Target_1/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 85,
    "image_id": "2010_003670",
    "target_type": "Target_1",
    "original_image": "data/2010_003670/Target_1/original.png",
    "heatmap_image": "data/2010_003670/Target_1/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 86,
    "image_id": "2010_003670",
    "target_type": "Target_2",
    "original_image": "data/2010_003670/Target_2/original.png",
    "heatmap_image": "data/2010_003670/Target_2/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad"
  },
  {
    "id": 87,
    "image_id": "2010_003670",
    "target_type": "Target_2",
    "original_image": "data/2010_003670/Target_2/original.png",
    "heatmap_image": "data/2010_003670/Target_2/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad OMP"
  },
  {
    "id": 88,
    "image_id": "2010_003670",
    "target_type": "Target_fake",
    "original_image": "data/2010_003670/Target_fake/original.png",
    "heatmap_image": "data/2010_003670/Target_fake/legrad.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 89,
    "image_id": "2010_003670",
    "target_type": "Target_fake",
    "original_image": "data/2010_003670/Target_fake/original.png",
    "heatmap_image": "data/2010_003670/Target_fake/legrad_omp.png",
    "options": [
      "Dog",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 90,
    "image_id": "2010_004760",
    "target_type": "Target_1",
    "original_image": "data/2010_004760/Target_1/original.png",
    "heatmap_image": "data/2010_004760/Target_1/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad"
  },
  {
    "id": 91,
    "image_id": "2010_004760",
    "target_type": "Target_1",
    "original_image": "data/2010_004760/Target_1/original.png",
    "heatmap_image": "data/2010_004760/Target_1/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad OMP"
  },
  {
    "id": 92,
    "image_id": "2010_004760",
    "target_type": "Target_2",
    "original_image": "data/2010_004760/Target_2/original.png",
    "heatmap_image": "data/2010_004760/Target_2/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 93,
    "image_id": "2010_004760",
    "target_type": "Target_2",
    "original_image": "data/2010_004760/Target_2/original.png",
    "heatmap_image": "data/2010_004760/Target_2/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 94,
    "image_id": "2010_004760",
    "target_type": "Target_fake",
    "original_image": "data/2010_004760/Target_fake/original.png",
    "heatmap_image": "data/2010_004760/Target_fake/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 95,
    "image_id": "2010_004760",
    "target_type": "Target_fake",
    "original_image": "data/2010_004760/Target_fake/original.png",
    "heatmap_image": "data/2010_004760/Target_fake/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 96,
    "image_id": "2010_005796",
    "target_type": "Target_1",
    "original_image": "data/2010_005796/Target_1/original.png",
    "heatmap_image": "data/2010_005796/Target_1/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad"
  },
  {
    "id": 97,
    "image_id": "2010_005796",
    "target_type": "Target_1",
    "original_image": "data/2010_005796/Target_1/original.png",
    "heatmap_image": "data/2010_005796/Target_1/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Cat",
    "method": "LeGrad OMP"
  },
  {
    "id": 98,
    "image_id": "2010_005796",
    "target_type": "Target_2",
    "original_image": "data/2010_005796/Target_2/original.png",
    "heatmap_image": "data/2010_005796/Target_2/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad"
  },
  {
    "id": 99,
    "image_id": "2010_005796",
    "target_type": "Target_2",
    "original_image": "data/2010_005796/Target_2/original.png",
    "heatmap_image": "data/2010_005796/Target_2/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Dog",
    "method": "LeGrad OMP"
  },
  {
    "id": 100,
    "image_id": "2010_005796",
    "target_type": "Target_fake",
    "original_image": "data/2010_005796/Target_fake/original.png",
    "heatmap_image": "data/2010_005796/Target_fake/legrad.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 101,
    "image_id": "2010_005796",
    "target_type": "Target_fake",
    "original_image": "data/2010_005796/Target_fake/original.png",
    "heatmap_image": "data/2010_005796/Target_fake/legrad_omp.png",
    "options": [
      "Cat",
      "Dog",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 102,
    "image_id": "2011_000219",
    "target_type": "Target_1",
    "original_image": "data/2011_000219/Target_1/original.png",
    "heatmap_image": "data/2011_000219/Target_1/legrad.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Bird",
    "method": "LeGrad"
  },
  {
    "id": 103,
    "image_id": "2011_000219",
    "target_type": "Target_1",
    "original_image": "data/2011_000219/Target_1/original.png",
    "heatmap_image": "data/2011_000219/Target_1/legrad_omp.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Bird",
    "method": "LeGrad OMP"
  },
  {
    "id": 104,
    "image_id": "2011_000219",
    "target_type": "Target_2",
    "original_image": "data/2011_000219/Target_2/original.png",
    "heatmap_image": "data/2011_000219/Target_2/legrad.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Cow",
    "method": "LeGrad"
  },
  {
    "id": 105,
    "image_id": "2011_000219",
    "target_type": "Target_2",
    "original_image": "data/2011_000219/Target_2/original.png",
    "heatmap_image": "data/2011_000219/Target_2/legrad_omp.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Cow",
    "method": "LeGrad OMP"
  },
  {
    "id": 106,
    "image_id": "2011_000219",
    "target_type": "Target_fake",
    "original_image": "data/2011_000219/Target_fake/original.png",
    "heatmap_image": "data/2011_000219/Target_fake/legrad.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 107,
    "image_id": "2011_000219",
    "target_type": "Target_fake",
    "original_image": "data/2011_000219/Target_fake/original.png",
    "heatmap_image": "data/2011_000219/Target_fake/legrad_omp.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 108,
    "image_id": "2011_000548",
    "target_type": "Target_1",
    "original_image": "data/2011_000548/Target_1/original.png",
    "heatmap_image": "data/2011_000548/Target_1/legrad.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Bird",
    "method": "LeGrad"
  },
  {
    "id": 109,
    "image_id": "2011_000548",
    "target_type": "Target_1",
    "original_image": "data/2011_000548/Target_1/original.png",
    "heatmap_image": "data/2011_000548/Target_1/legrad_omp.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Bird",
    "method": "LeGrad OMP"
  },
  {
    "id": 110,
    "image_id": "2011_000548",
    "target_type": "Target_2",
    "original_image": "data/2011_000548/Target_2/original.png",
    "heatmap_image": "data/2011_000548/Target_2/legrad.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Cow",
    "method": "LeGrad"
  },
  {
    "id": 111,
    "image_id": "2011_000548",
    "target_type": "Target_2",
    "original_image": "data/2011_000548/Target_2/original.png",
    "heatmap_image": "data/2011_000548/Target_2/legrad_omp.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Cow",
    "method": "LeGrad OMP"
  },
  {
    "id": 112,
    "image_id": "2011_000548",
    "target_type": "Target_fake",
    "original_image": "data/2011_000548/Target_fake/original.png",
    "heatmap_image": "data/2011_000548/Target_fake/legrad.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 113,
    "image_id": "2011_000548",
    "target_type": "Target_fake",
    "original_image": "data/2011_000548/Target_fake/original.png",
    "heatmap_image": "data/2011_000548/Target_fake/legrad_omp.png",
    "options": [
      "Bird",
      "Cow",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 114,
    "image_id": "2011_000834",
    "target_type": "Target_1",
    "original_image": "data/2011_000834/Target_1/original.png",
    "heatmap_image": "data/2011_000834/Target_1/legrad.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Bird",
    "method": "LeGrad"
  },
  {
    "id": 115,
    "image_id": "2011_000834",
    "target_type": "Target_1",
    "original_image": "data/2011_000834/Target_1/original.png",
    "heatmap_image": "data/2011_000834/Target_1/legrad_omp.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Bird",
    "method": "LeGrad OMP"
  },
  {
    "id": 116,
    "image_id": "2011_000834",
    "target_type": "Target_2",
    "original_image": "data/2011_000834/Target_2/original.png",
    "heatmap_image": "data/2011_000834/Target_2/legrad.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad"
  },
  {
    "id": 117,
    "image_id": "2011_000834",
    "target_type": "Target_2",
    "original_image": "data/2011_000834/Target_2/original.png",
    "heatmap_image": "data/2011_000834/Target_2/legrad_omp.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad OMP"
  },
  {
    "id": 118,
    "image_id": "2011_000834",
    "target_type": "Target_fake",
    "original_image": "data/2011_000834/Target_fake/original.png",
    "heatmap_image": "data/2011_000834/Target_fake/legrad.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 119,
    "image_id": "2011_000834",
    "target_type": "Target_fake",
    "original_image": "data/2011_000834/Target_fake/original.png",
    "heatmap_image": "data/2011_000834/Target_fake/legrad_omp.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  },
  {
    "id": 120,
    "image_id": "2011_002464",
    "target_type": "Target_1",
    "original_image": "data/2011_002464/Target_1/original.png",
    "heatmap_image": "data/2011_002464/Target_1/legrad.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Bird",
    "method": "LeGrad"
  },
  {
    "id": 121,
    "image_id": "2011_002464",
    "target_type": "Target_1",
    "original_image": "data/2011_002464/Target_1/original.png",
    "heatmap_image": "data/2011_002464/Target_1/legrad_omp.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 0,
    "correct_name": "Bird",
    "method": "LeGrad OMP"
  },
  {
    "id": 122,
    "image_id": "2011_002464",
    "target_type": "Target_2",
    "original_image": "data/2011_002464/Target_2/original.png",
    "heatmap_image": "data/2011_002464/Target_2/legrad.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad"
  },
  {
    "id": 123,
    "image_id": "2011_002464",
    "target_type": "Target_2",
    "original_image": "data/2011_002464/Target_2/original.png",
    "heatmap_image": "data/2011_002464/Target_2/legrad_omp.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 1,
    "correct_name": "Sheep",
    "method": "LeGrad OMP"
  },
  {
    "id": 124,
    "image_id": "2011_002464",
    "target_type": "Target_fake",
    "original_image": "data/2011_002464/Target_fake/original.png",
    "heatmap_image": "data/2011_002464/Target_fake/legrad.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad"
  },
  {
    "id": 125,
    "image_id": "2011_002464",
    "target_type": "Target_fake",
    "original_image": "data/2011_002464/Target_fake/original.png",
    "heatmap_image": "data/2011_002464/Target_fake/legrad_omp.png",
    "options": [
      "Bird",
      "Sheep",
      "None of them"
    ],
    "correct_index": 2,
    "correct_name": "None of them",
    "method": "LeGrad OMP"
  }
];