import dayjs from "dayjs";
import { jsPDF } from 'jspdf';
import moment from 'moment';

export const compareDatesDesc =
  (dateKey = "date") =>
    (a, b) =>
      b[dateKey] - a[dateKey];

export const getMySqlDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export function isBlob(obj) {
  return obj instanceof Blob;
}

export function snakeCaseToTitleCase(str) {
  const words = str.replace(/_/g, " ").split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}

export function convertToUrlSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim("-");
}

export const sortFilterData = [
  {
    sortBy: 'popularity',
    // value:'Popularity'
  },
  {
    sortBy: 'new-arrivals',
    // value:'New Arrivals'
  },
  {
    sortBy: 'price-high-to-low',
    // value:'Price Hight To Low'
  },
  {
    sortBy: 'price-low-to-high',
    // value:'Price Low To High'
  },
  {
    sortBy: 'discount',
    // value:'Discount'
  },
];
export function generatePDF(date) {
  const doc = new jsPDF();
  doc.text(`Invoice ID: ${date.invoiceData.id}`, 10, 10);
  doc.text(`Date: ${date.invoiceData.date}`, 10, 20);
  doc.text(`Customer: ${invoiceData.customer}`, 10, 30);
  let y = 40;
  date.invoiceData.items.forEach(item => {
    doc.text(`${item.description} - ${item.quantity} x $${item.price}`, 10, y);
    y += 10;
  });
  doc.text(`Total: $${date.invoiceData.total}`, 10, y + 10);
  doc.save('invoice.pdf');
};
export const zipCodePattern = /\b\d{6}\b/g;
export const addDays = (n, date) => {
  const d = date ? moment(date) : moment();
  const new_date = d.add(parseInt(n), 'days').format("D MMM, ddd");
  return new_date;
};