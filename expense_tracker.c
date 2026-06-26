#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILE_NAME "transactions.txt"

struct Transaction {
    char type[10];
    char category[30];
    float amount;
};

void addTransaction();
void viewTransactions();
void searchCategory();
void showSummary();

int main() {
    int choice;

    while (1) {
        printf("\n=====================================\n");
        printf("      PERSONAL EXPENSE TRACKER\n");
        printf("=====================================\n");
        printf("1. Add Income\n");
        printf("2. Add Expense\n");
        printf("3. View Transactions\n");
        printf("4. Search by Category\n");
        printf("5. Show Summary\n");
        printf("6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addTransaction("Income");
                break;
            case 2:
                addTransaction("Expense");
                break;
            case 3:
                viewTransactions();
                break;
            case 4:
                searchCategory();
                break;
            case 5:
                showSummary();
                break;
            case 6:
                printf("\nThank you for using Expense Tracker!\n");
                exit(0);
            default:
                printf("Invalid Choice!\n");
        }
    }

    return 0;
}

void addTransaction(char type[])
{
    FILE *fp = fopen(FILE_NAME, "a");

    if (fp == NULL) {
        printf("Error opening file!\n");
        return;
    }

    struct Transaction t;

    strcpy(t.type, type);

    printf("Enter Category: ");
    scanf("%s", t.category);

    printf("Enter Amount: ");
    scanf("%f", &t.amount);

    fprintf(fp, "%s %s %.2f\n", t.type, t.category, t.amount);

    fclose(fp);

    printf("\nTransaction Added Successfully!\n");
}

void viewTransactions()
{
    FILE *fp = fopen(FILE_NAME, "r");

    if (fp == NULL) {
        printf("\nNo Transactions Found!\n");
        return;
    }

    struct Transaction t;

    printf("\n--------------------------------------------\n");
    printf("%-10s %-15s %-10s\n", "TYPE", "CATEGORY", "AMOUNT");
    printf("--------------------------------------------\n");

    while (fscanf(fp, "%s %s %f",
                  t.type,
                  t.category,
                  &t.amount) != EOF) {

        printf("%-10s %-15s %.2f\n",
               t.type,
               t.category,
               t.amount);
    }

    fclose(fp);
}

void searchCategory()
{
    FILE *fp = fopen(FILE_NAME, "r");

    if (fp == NULL) {
        printf("No Data Available!\n");
        return;
    }

    char search[30];
    int found = 0;

    struct Transaction t;

    printf("Enter Category to Search: ");
    scanf("%s", search);

    printf("\nResults:\n");

    while (fscanf(fp,"%s %s %f",
                  t.type,
                  t.category,
                  &t.amount)!=EOF) {

        if(strcmp(search,t.category)==0) {
            printf("%-10s %-15s %.2f\n",
                   t.type,
                   t.category,
                   t.amount);
            found=1;
        }
    }

    if(!found)
        printf("Category Not Found!\n");

    fclose(fp);
}

void showSummary()
{
    FILE *fp=fopen(FILE_NAME,"r");

    if(fp==NULL){
        printf("No Transactions Available!\n");
        return;
    }

    struct Transaction t;

    float income=0;
    float expense=0;

    while(fscanf(fp,"%s %s %f",
                 t.type,
                 t.category,
                 &t.amount)!=EOF){

        if(strcmp(t.type,"Income")==0)
            income+=t.amount;
        else
            expense+=t.amount;
    }

    fclose(fp);

    printf("\n========== SUMMARY ==========\n");
    printf("Total Income   : %.2f\n",income);
    printf("Total Expense  : %.2f\n",expense);
    printf("Current Balance: %.2f\n",income-expense);
}
