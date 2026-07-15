import { ApiError } from "@/errors/ApiError";
import { ApiErrorResponse } from "@/types/api";

export abstract class BaseApi {
  protected async throwApiError(response: Response) {
    const error: ApiErrorResponse = await response.json();

    throw new ApiError(error.message, response.status, error.errors);
  }

  protected async fetchRequest<T>(
    url: string,
    options?: RequestInit,
  ): Promise<T> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;
    const response = await fetch(`${API_URL}${url}`, options);

    if (!response.ok) {
      await this.throwApiError(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }
}
