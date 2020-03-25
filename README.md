# Point of Sale App dubbed as MyPOS App

#### Demo 
Please kindly note that this app was meant to be used as a desktop app in stores. Nonetheless, it has been made somewhat responsive for ipad and iphone 6/7/8 screens.

Also, the app is currently using React hooks, Redux and Context API coupled with Typescript all together in order to serve the purpose showing my knowledge on all of these technologies and tools.

https://retail-pos-app.herokuapp.com/

(heroku servers shut down when idle on the free plan, so initial loading takes some time)
- Login Credentials 
  - email: admin@admin.com
  - password: admin

Currently I'm adding the functionality of inventory count page of which the main layout somewhat completed.

#### Pages and Features

# Sign in Page
  - Used Formik and Yup for validation purposes.
  
# Dashboard Page
  - Stacked revenue chart both for web and store revenues.
  - Stacked revenue, products sold and sale count cards that shows data in correlation with the dates selected.
  - Top selling items 
  - All of above-mentioned data can be filtered using the date filter. The default value for the date picker is last thirty(30) days. It also has default values for the cases where one of the start or end date are not selected by the user.
  - Last activities for stock management 
  
  # Sales 
    # Point of Sale / Cash Register Page
      - Search products by name, sku and barcode.
      - If searched product is not found, plus button appears which opens a dialog for adding new product.
      - New product input fields uses reusable custom input and formik as well as yup for validation.
      - Adding new product will give either success or error feedback by the reusable snackbar component.
      - The total price, tax and discount shall be calculated automatically once the product is added.
      - The price is editable with a popover and the total is calculated again on price change. 
      - Right and left arrows increases and decreases quantities respectively.
      - Totals adjust when a product is deleted or quantity is changed.
      - Discount input provides the possibility of implementing an additional discount to total price.
      - If the sale is completed successfully, there is a success feedback with a snackbar appearing.
      - Once the sale is completed, they appear in sales history. 
      - Products are coming from local storage by the help of useLocalStorageReducerState hook which is utterly reusable and can be used by any useReducer hook. 
  
    # useSalesState hook test
      - Used react test library to test the hook responsible for POS functionality.
  
   # Sales History Page
    - Reusable Material UI Table.
    - When clicked it shows the sales details.
    - Filtering sales by start and end dates.
    - Pagination.

# Inventory
  # Products Page
  - Reusable Material UI Table.
  - When clicked it shows product details.
  - When edit icon clicked all information for that particular product can be edited.
  - If the editing is completed successfully, there is a success feedback with a snackbar appearing.
  - Reusable edit inputs.
  - Filtering by name/sku/barcode, category or brand.
  - After applying filters, chip inputs appear in order to remove the applied filters and apply new ones.
  - Pagination.
  
 # Error Boundary component
  - Catches all the errors from child tree.
  - Since it was not catching async errors by nature, useAsyncError hook was created to manually throw error when API calls fail for any reason.