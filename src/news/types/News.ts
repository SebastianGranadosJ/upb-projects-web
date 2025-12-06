import Quote from "./Quote";

export default interface News {
  title: string;
  projectName: string;
  groupMembers: string[];
  subject: string;
  shortDescription: string;
  content: string;
  mainImage: string;
  date: Date;
  quotes: Quote[];
}
