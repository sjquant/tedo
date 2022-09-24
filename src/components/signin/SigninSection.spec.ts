import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import SigninSection from "./SigninSection.vue";
import { createFakeRouter } from "../../utils/testing";
import { useUserStore } from "../../stores/user";

describe("SigninSection", () => {
  it("routes to main page on singin success", async () => {
    // Given
    const router = createFakeRouter("/");
    vi.spyOn(router, "push");

    const wrapper = mount(SigninSection, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    });

    // When
    await wrapper.find('[data-test="google-signin-btn"]').trigger("click");

    // Then
    expect(router.push).toHaveBeenCalledWith("/");
  });

  it("alerts error on signin failed", async () => {
    // Given
    const router = createFakeRouter("/");
    vi.spyOn(router, "push");
    vi.spyOn(window, "alert");

    const wrapper = mount(SigninSection, {
      global: {
        plugins: [router, createTestingPinia({ stubActions: false })],
      },
    });

    const userStore = useUserStore();
    userStore.oauthSignin = vi.fn().mockRejectedValue(new Error("Some Error"));

    // When
    await wrapper.find('[data-test="google-signin-btn"]').trigger("click");

    // Then
    expect(router.push).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});
