import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize access control & authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  public type UserProfile = {
    name : Text;
  };

  public type Member = {
    id : Text;
    name : Text;
    membershipTier : Text;
    faceHash : Text;
  };

  public type VerificationResult = {
    passengerName : Text;
    membershipTier : Text;
    confidenceScore : Nat;
    verificationTime : Int;
    accessGranted : Bool;
  };

  public type EntryLog = {
    timestamp : Int;
    passengerName : Text;
    result : Text; // "Granted" or "Denied"
    confidenceScore : Nat;
  };

  // State
  let userProfiles = Map.empty<Principal, UserProfile>();
  let members = Map.empty<Text, Member>();
  var nextMemberId = 0;
  let entryLogs = Map.empty<Int, EntryLog>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Member management
  public shared ({ caller }) func addMember(name : Text, membershipTier : Text, faceHash : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add members");
    };

    let memberId = nextMemberId.toText();
    nextMemberId += 1;

    let member : Member = {
      id = memberId;
      name;
      membershipTier;
      faceHash;
    };

    members.add(memberId, member);
    memberId;
  };

  public query ({ caller }) func getMembers() : async [Member] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view members");
    };
    members.values().toArray();
  };

  public query ({ caller }) func getMemberById(id : Text) : async ?Member {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view member details");
    };
    members.get(id);
  };

  // Verification
  public shared ({ caller }) func simulateVerification(imageHash : Text) : async VerificationResult {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can run verification");
    };

    // Fake verification logic - reverse iter for recent results first
    let matchingMember = members.values().toArray().reverse().find(
      func(member) {
        member.faceHash == imageHash;
      }
    );

    let verificationTime = Time.now();

    let result : VerificationResult = switch (matchingMember) {
      case (?member) {
        {
          passengerName = member.name;
          membershipTier = member.membershipTier;
          confidenceScore = 95;
          verificationTime;
          accessGranted = true;
        };
      };
      case (null) {
        {
          passengerName = "Unknown";
          membershipTier = "N/A";
          confidenceScore = 60;
          verificationTime;
          accessGranted = false;
        };
      };
    };

    // Log entry
    let entryLog : EntryLog = {
      timestamp = verificationTime;
      passengerName = result.passengerName;
      result = if (result.accessGranted) { "Granted" } else { "Denied" };
      confidenceScore = result.confidenceScore;
    };
    entryLogs.add(verificationTime, entryLog);

    result;
  };

  // Entry logs
  public query ({ caller }) func getEntryLogs() : async [EntryLog] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view entry logs");
    };
    entryLogs.values().toArray();
  };
};
