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