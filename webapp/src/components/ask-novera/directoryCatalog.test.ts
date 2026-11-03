// Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express governing permissions and limitations
// under the License.

import { describe, expect, it } from "vitest";
import { matchDirectory } from "./directoryCatalog";

describe("matchDirectory best-match scoring", () => {
  it("prioritizes bucket match when provided", () => {
    const match = matchDirectory("anything", "LEAVE_STANDARD");
    expect(match?.id).toBe("me-leave");
  });

  it("matches exact title with top priority", () => {
    const match = matchDirectory("Settings");
    expect(match?.id).toBe("settings");
  });

  it("selects people-par-lead over me-team for multi-word 'team appraisal'", () => {
    const match = matchDirectory("team appraisal");
    expect(match?.id).toBe("people-par-lead");
  });

  it("selects people-par-lead over finance-approvals and me-par for 'par review'", () => {
    const match = matchDirectory("par review");
    expect(match?.id).toBe("people-par-lead");
  });

  it("selects people-par-lead over me-team for 'lead par'", () => {
    const match = matchDirectory("lead par");
    expect(match?.id).toBe("people-par-lead");
  });

  it("matches single-word keywords when no longer phrase matches", () => {
    const match = matchDirectory("expense");
    expect(match?.id).toBe("me-claims");
  });

  it("returns undefined for empty, whitespace, or unmatched queries", () => {
    expect(matchDirectory("")).toBeUndefined();
    expect(matchDirectory("   ")).toBeUndefined();
    expect(matchDirectory("what is the wifi password?")).toBeUndefined();
  });
});
