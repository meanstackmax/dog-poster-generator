type GetByBreedPayload = {
  breed: string;
  count: string;
};

type GetBySubBreedPayload = {
  breed: string;
  subBreed: string;
  count: string;
};

type Status = "success" | "error";

type AllResponse = {
  message: Record<string, string[]>;
  status: Status;
};

type Response = {
  message: string[];
  status: Status;
};

export type { GetByBreedPayload, GetBySubBreedPayload, AllResponse, Response };
