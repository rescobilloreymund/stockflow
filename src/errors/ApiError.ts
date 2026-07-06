import React, { Component } from "react";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string>,
  ) {
    super(message);

    this.name = "ApiError";
  }
}
