import { SizeEnum } from "@/enums/sizeEnum";

export interface LoadingProps {
  tip?: string,
  loading: boolean,
  size?: SizeEnum,
  background?: string,
  absolute?: boolean,
}
