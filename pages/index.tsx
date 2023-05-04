import type { NextPage } from "next";
import styles from "./style.module.scss";
import CardColumnListContainer from "containers/boards/CardColumnListContainer";
import ModalContainer from "containers/commons/ModalContainer";
import { useAppStore } from "lib/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/commons/Header"), {
    ssr: false,
});
const SidebarContainer = dynamic(
    () => import("../containers/commons/SidebarContainer"),
    {
        ssr: false,
    }
);

const Home: NextPage = () => {
    const { boards } = useAppStore();
    const router = useRouter();
    const {
        pathname,
        query: { id },
    } = router;

    useEffect(() => {
        if (!router.isReady || id) {
            return;
        }

        router.push({
            pathname,
            query: {
                ...router.query,
                id: boards[0].id,
            },
        });
    }, [boards, router]);

    if (!id) {
        return <></>;
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <SidebarContainer />
                    <div className={styles.content}>
                        <Header />
                        <CardColumnListContainer
                            className={styles.cardColumnListContainer}
                        />
                    </div>
                </div>

                <ModalContainer />
            </main>
        </>
    );
};

export default Home;
