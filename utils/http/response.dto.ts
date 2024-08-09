export class PagingResponseDTO {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export class ResponseDTO<T> {
  success: boolean;
  message: string;
  data?: T;
  paging?: PagingResponseDTO;

  constructor(params: {
    success: boolean;
    message: string;
    data?: T;
    paging?: PagingResponseDTO;
  }) {
    this.success = params.success;
    this.message = params.message;
    this.data = params.data;
    this.paging = params.paging;
  }
}

export class SuccessResponseDTO<T> extends ResponseDTO<T> {
  constructor(params: {
    message: string;
    data?: T;
    paging?: PagingResponseDTO;
  }) {
    super({
      success: true,
      message: params.message,
      data: params.data,
      paging: params.paging,
    });
  }
}

export class ErrorResponseDTO<T> extends ResponseDTO<T> {
  constructor(params: { message: string }) {
    super({
      success: false,
      message: params.message,
    });
  }
}
