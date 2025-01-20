# TemporaryGateForNewCode

**Namespace:** `Psi.Data.Models.ClientConfigurationModels`

**Source File:** `Psi.Models.ClientConfigurationModels/Settings.cs`

## Class Summary

public class TemporaryGateForNewCode

## Class Metadata

```typescript
public class TemporaryGateForNewCode
```

## Enums

### TemporaryGateForNewCode

/* All temporary gates need to be a bool setting (default to true) and have the prefix of Temporary.TemporaryGateForNewCode.
     * 
     * For instance, if SendNewSecureMessagesFromSecureMessagingManager is an enum below, then there should be a bool setting of
     *      Temporary.TemporaryGateForNewCode.SendNewSecureMessagesFromSecureMessagingManager
     *
     *  The setting needs to be set up in Omega, but doesn't have to exist in the client context (it will assume true unless a setting exists with 'false').
     */

```typescript
    SendNewSecureMessagesFromSecureMessagingManager = 0
    MetavanteChangePayeeAccountNumberDisabled = 1
    DataFeedReadLatestForMemberBySqlDisabled = 2
```
