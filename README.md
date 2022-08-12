# Blockchain Explorer - Requirements 
---
---
## (PS.1): Can a private blockchain system be implemented to certify transactions and documents signed via the DocBridge.io user interface? 

### 1) As a user of DocBridge.io I want to be able to tie user signatures for a document to a private blockchain so that I may know that the signature is authentic. 
Acceptance criteria: 
  * a) Signatures may be tied to documents as a transaction sending the document or as a transaction that sends data to the document from a user. 
### 2) As an administrator I want a blockchain explorer so that I can search for real-time and historical information related to the transactions that are stored in the private blockchain. 
Acceptance criteria: 
  * a) An administrator should be able to find the document identifier on the blockchain. 
  * b) An administrator should be able to upload a document to the blockchain explorer to confirm the validity of the document. 
### 3) As an administrator, I want the blockchain to be a private blockchain that restricts who holds the ledger so that documents and signatures are kept private within the system and cannot be publicly viewed. 
Acceptance criteria: 
  - a) Blockchain exploration is restricted to admin user accounts that are both authenticated through Google oAuthentication and within the “admin_user” database table. 
  - b) New blocks may only be committed by privileged instances committing to the database. Requirements: PhiQuest Project (1.03) March 30, 2022 
---
---
## (PS.2): Can an administration user interface be implemented so that operations personnel can visualize Docbridge.io metrics, perform user administration, and log selective events and transactions? 

### 1) As an administrator I want a back-end administration interface for the DocBridge.io system so that I can edit information of users that are using DocBridge.io. 
Acceptance criteria: 
  - a) An administrator should be able to add accounts, remove accounts and edit accounts with this interface. 
### 2) As an administrator I want a back-end visualization interface for the DocBridge.io system so that I can visualize DocBridge metrics. 
Acceptance criteria: 
  - a) The metrics should be visualized in a dashboard available in the administration interface. 
  - b) The displayed metrics should at least include the number of users and how many documents have been sent. 
### 3) As an administrator I want a back-end administration interface for the DocBridge.io system so that I can view and edit information of all users of DocBridge.io. 
Acceptance criteria: 
  - a) An administrator should be able to reset a user's API key. 
  - b) An administrator should be able to edit a user’s email, groups, workflows and personal information. 
### 4) As an administrator I want a back-end administration interface for the DocBridge.io system so that I can view information on previous operations. 
Acceptance criteria: 
  - a) An administrator should be able to see when workflows start, when groups are created/deleted, and when program failures occur.
