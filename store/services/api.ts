import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, LoginRequest, LoginResponse } from "@/types/auth";
import {
  ShipmentListRequest,
  ShipmentListResponse,
  ShipmentStatusListRequest,
  ShipmentStatusListResponse,
} from "@/types/shipment";

// Define a service using a base URL and expected endpoints
export const shippexApi = createApi({
  reducerPath: "shippexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shippex-demo.bc.brandimic.com/api/method",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ usr, pwd }) => ({
        url: `/login`,
        method: "POST",
        body: { usr, pwd },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
    getLoggedInUser: builder.query<AuthResponse, void>({
      query: () => ({
        url: `/frappe.auth.get_logged_user`,
        method: "GET",
      }),
    }),
    getShipmentList: builder.query<ShipmentListResponse, ShipmentListRequest>({
      query: ({ filters, fields }) => {
        let params: {
          doctype: string;
          fields: string[];
          filters?: string;
        } = {
          doctype: "AWB",
          fields: fields ? fields : ["*"],
        };

        if (filters) {
          params.filters = JSON.stringify(filters);
        }

        return {
          url: `/frappe.client.get_list`,
          method: "GET",
          params,
        };
      },
    }),
    getShipmentStatusList: builder.query<
      ShipmentStatusListResponse,
      ShipmentStatusListRequest
    >({
      query: ({ fields }) => ({
        url: `/frappe.client.get_list`,
        method: "GET",
        params: {
          doctype: "AWB Status",
          fields: fields ? fields : ["*"],
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetLoggedInUserQuery,
  useGetShipmentListQuery,
  useGetShipmentStatusListQuery,
} = shippexApi;
